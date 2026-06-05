import React, { useState } from 'react';
import {
  Plus, Edit2, Trash2, Check, X as XIcon,
  ToggleLeft, ToggleRight, PlusCircle, RotateCcw, Package,
} from 'lucide-react';
import {
  getProducts, addProduct, updateProduct, deleteProduct, addCategory, resetToDefaults,
} from '../utils/productStorage';

const EMPTY_FORM = { nombre: '', precio: '', desc: '' };

const AdminProductsTab = () => {
  const [products,      setProducts]      = useState(() => getProducts());
  const [activecat,     setActivecat]     = useState(() => Object.keys(getProducts())[0] || '');
  const [editingId,     setEditingId]     = useState(null);
  const [editForm,      setEditForm]      = useState(EMPTY_FORM);
  const [showAddForm,   setShowAddForm]   = useState(false);
  const [addForm,       setAddForm]       = useState(EMPTY_FORM);
  const [showNewCat,    setShowNewCat]    = useState(false);
  const [newCatName,    setNewCatName]    = useState('');

  const categories       = Object.keys(products);
  const currentProducts  = products[activecat] || [];
  const activeCount      = currentProducts.filter((p) => p.activo).length;

  /* ── handlers ────────────────────────────────────────── */
  const reload = (updated) => {
    setProducts({ ...updated });
    if (!updated[activecat]) setActivecat(Object.keys(updated)[0] || '');
  };

  const toggleActive = (id, current) => reload(updateProduct(activecat, id, { activo: !current }));

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({ nombre: p.nombre, precio: String(p.precio), desc: p.desc || '' });
    setShowAddForm(false);
  };

  const saveEdit = (id) => {
    reload(updateProduct(activecat, id, editForm));
    setEditingId(null);
    setEditForm(EMPTY_FORM);
  };

  const handleDelete = (id, nombre) => {
    if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
    reload(deleteProduct(activecat, id));
  };

  const handleAdd = () => {
    if (!addForm.nombre.trim() || !addForm.precio) return;
    reload(addProduct(activecat, addForm));
    setAddForm(EMPTY_FORM);
    setShowAddForm(false);
  };

  const handleAddCategory = () => {
    const name = newCatName.trim();
    if (!name) return;
    const updated = addCategory(name);
    setProducts(updated);
    setActivecat(name);
    setNewCatName('');
    setShowNewCat(false);
  };

  const handleReset = () => {
    if (!window.confirm('¿Restaurar todos los productos a los valores originales? Se perderán todos los cambios.')) return;
    const defaults = resetToDefaults();
    setProducts(defaults);
    setActivecat(Object.keys(defaults)[0]);
    setEditingId(null);
    setShowAddForm(false);
  };

  /* ── render ──────────────────────────────────────────── */
  return (
    <div className="space-y-5">

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActivecat(cat); setEditingId(null); setShowAddForm(false); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              activecat === cat
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-400'
            }`}
          >
            {cat} <span className="opacity-60 font-normal">({(products[cat] || []).length})</span>
          </button>
        ))}

        {showNewCat ? (
          <div className="flex gap-2 items-center">
            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              placeholder="Nombre de categoría"
              autoFocus
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400 w-44"
            />
            <button onClick={handleAddCategory} className="text-green-600 hover:text-green-700 p-1.5 bg-green-50 rounded-lg transition">
              <Check size={16} />
            </button>
            <button onClick={() => { setShowNewCat(false); setNewCatName(''); }} className="text-gray-400 hover:text-gray-600 p-1.5 bg-gray-50 rounded-lg transition">
              <XIcon size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewCat(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-orange-600 border border-dashed border-orange-300 rounded-xl hover:bg-orange-50 transition"
          >
            <Plus size={14} /> Nueva categoría
          </button>
        )}
      </div>

      {/* Product list card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800">{activecat}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{activeCount} activo(s) de {currentProducts.length}</p>
          </div>
        </div>

        {currentProducts.length === 0 ? (
          <div className="py-14 text-center text-gray-300">
            <Package size={40} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm text-gray-400">Sin productos en esta categoría</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {currentProducts.map((product) => (
              <div key={product.id} className="px-5 py-4">
                {editingId === product.id ? (
                  /* Edit form inline */
                  <div className="space-y-3 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                    <p className="text-xs font-bold text-orange-700 uppercase tracking-wider">Editando producto</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">Nombre *</label>
                        <input
                          autoFocus
                          value={editForm.nombre}
                          onChange={(e) => setEditForm((f) => ({ ...f, nombre: e.target.value }))}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">Precio (S/) *</label>
                        <input
                          type="number" step="0.10" min="0"
                          value={editForm.precio}
                          onChange={(e) => setEditForm((f) => ({ ...f, precio: e.target.value }))}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">Descripción</label>
                      <input
                        value={editForm.desc}
                        onChange={(e) => setEditForm((f) => ({ ...f, desc: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
                      />
                    </div>
                    <div className="flex gap-2 justify-end pt-1">
                      <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition">
                        Cancelar
                      </button>
                      <button
                        onClick={() => saveEdit(product.id)}
                        disabled={!editForm.nombre || !editForm.precio}
                        className="px-4 py-2 text-sm bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-bold disabled:opacity-50 transition"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Row */
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm leading-tight ${product.activo ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                        {product.nombre}
                      </p>
                      <p className="text-gray-400 text-xs truncate mt-0.5">{product.desc}</p>
                    </div>
                    <span className="text-orange-700 font-extrabold text-sm shrink-0 w-20 text-right">
                      S/ {product.precio.toFixed(2)}
                    </span>
                    <button
                      onClick={() => toggleActive(product.id, product.activo)}
                      title={product.activo ? 'Desactivar' : 'Activar'}
                      className={`shrink-0 transition ${product.activo ? 'text-green-500 hover:text-green-700' : 'text-gray-300 hover:text-gray-500'}`}
                    >
                      {product.activo ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
                    </button>
                    <button onClick={() => startEdit(product)} className="text-blue-400 hover:text-blue-600 transition p-1 shrink-0">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id, product.nombre)} className="text-red-300 hover:text-red-500 transition p-1 shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add form / Add button */}
        {showAddForm ? (
          <div className="px-5 pt-4 pb-5 border-t border-dashed border-gray-200 bg-green-50 space-y-3">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Nuevo Producto en {activecat}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Nombre *</label>
                <input
                  autoFocus
                  value={addForm.nombre}
                  onChange={(e) => setAddForm((f) => ({ ...f, nombre: e.target.value }))}
                  placeholder="Ej: Pan de Centeno"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400 bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Precio (S/) *</label>
                <input
                  type="number" step="0.10" min="0"
                  value={addForm.precio}
                  onChange={(e) => setAddForm((f) => ({ ...f, precio: e.target.value }))}
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400 bg-white"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">Descripción (opcional)</label>
              <input
                value={addForm.desc}
                onChange={(e) => setAddForm((f) => ({ ...f, desc: e.target.value }))}
                placeholder="Breve descripción del producto"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-green-400 bg-white"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button
                onClick={() => { setShowAddForm(false); setAddForm(EMPTY_FORM); }}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                disabled={!addForm.nombre.trim() || !addForm.precio}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold disabled:opacity-40 transition"
              >
                Agregar Producto
              </button>
            </div>
          </div>
        ) : (
          <div className="px-5 py-3.5 border-t border-dashed border-gray-100">
            <button
              onClick={() => { setShowAddForm(true); setEditingId(null); }}
              className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800 font-bold transition"
            >
              <PlusCircle size={17} /> Agregar Producto a {activecat}
            </button>
          </div>
        )}
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 border border-dashed border-gray-200 hover:border-red-300 rounded-xl px-3 py-2 transition"
        >
          <RotateCcw size={12} /> Restaurar productos por defecto
        </button>
      </div>
    </div>
  );
};

export default AdminProductsTab;
