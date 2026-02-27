"use client"

import toast from "react-hot-toast";
import { uploadProductAction } from "../_lib/actions";
import UploadProductButton from "./UploadProductButton";
import { useMemo, useState } from "react";
import { SIZE_ORDER_MAP } from "../_utils/constants";

const emptyVariant = () => ({
  size: "",
  size_order: "",
  stock: "",
  sale_percentage: "",
  sku: "",
})


function UploadProductForm() {
  const [variants, setVariants] = useState([emptyVariant()]);

  const [openSections, setOpenSections] = useState({
    basic: true,
    media: true,
    variants: true,
  });
  
  function updateVariant(index, key, value) {
    setVariants((prev) => {
      const next = [...prev];
      const updated = { ...next[index], [key]: value };

      if (key === "size") {
        const mapped = SIZE_ORDER_MAP[value.toLowerCase()];
        if (mapped) updated.size_order = mapped;
      }

      next[index] = updated;
      return next;
    });
  }

  function addVariant() {
    setVariants((prev) => [...prev, emptyVariant()]);
  }

  function removeVariant(index) {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

   // optional: basic client validation for duplicates
  const hasDuplicateSku = useMemo(() => {
    const skus = variants.map((v) => v.sku.trim()).filter(Boolean);
    return new Set(skus).size !== skus.length;
  }, [variants]);

  async function clientAction(formData) {
    // Put variants as JSON in the same form submit
    formData.set("variants", JSON.stringify(variants));

    if (hasDuplicateSku) {
      toast.error("Duplicate SKU detected in variants.");
      return;
    }

    const res = await uploadProductAction(formData)

    if(res?.ok) 
      toast.success("Product Uploaded");
    else if(res === "no change")
      toast(`No Changed Data`);
    else if(res === "Missing data")
      toast.error('Upload failed, missing data!')
    else
      toast.error(`Product Upload Failed: ", ${res}`);

  }

  return (
    <form
      id="uploadProduct-form"
      action={clientAction}
      className="bg-(--cream-secondary) py-4 px-6 flex flex-col gap-2 max-w-2xl mb-10 rounded-2xl text-base"
    >

      {/* SECTION 1: Basic info */}
      <details open={openSections.basic} className="rounded-xl bg-white/40 p-3">
        <summary
          className="cursor-pointer font-semibold select-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenSections((s) => ({ ...s, basic: !s.basic }));
          }}
        >
          Basic info
        </summary>

        {openSections.basic && (
          <div className="mt-3 flex flex-col gap-2">
            <Field label="Product Name">
              <input
                name="productName"
                required
                className="profileFormInput shadow-sm md2:text-base text-sm"
              />
            </Field>

            <Field label="Slug">
              <input
                name="slug"
                required
                className="profileFormInput shadow-sm md2:text-base text-sm"
              />
            </Field>

            <Field label="Description">
              <textarea
                name="description"
                required
                className="profileFormInput shadow-sm md2:text-base text-sm"
              />
            </Field>

            <Field label="Price">
              <input
                name="price"
                required
                inputMode="decimal"
                className="profileFormInput shadow-sm md2:text-base text-sm"
              />
            </Field>

            <Field label="Category">
              <select
                name="category"
                required
                className="profileFormInput shadow-sm md2:text-base text-sm"
              >
                <option value="pants">Pants</option>
                <option value="shirts">Shirts</option>
                <option value="jackets">Jackets</option>
                <option value="shoes">Shoes</option>
                <option value="bags">Bags</option>
              </select>
            </Field>

            <Field label="Gender">
              <select
                name="gender"
                required
                className="profileFormInput shadow-sm md2:text-base text-sm"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </Field>
          </div>
        )}
      </details>

      {/* SECTION 2: Media */}
      <details open={openSections.media} className="rounded-xl bg-white/40 p-3">
        <summary
          className="cursor-pointer font-semibold select-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenSections((s) => ({ ...s, media: !s.media }));
          }}
        >
          Photos
        </summary>

        {openSections.media && (
          <div className="mt-3 flex flex-col gap-2">
            <Field label="Photos">
              <input
                name="photos"
                type="file"
                accept="image/*"
                multiple
                required
                className="profileFormInput shadow-sm md2:text-base text-sm"
              />
              <p className="text-xs opacity-70 pl-1">Upload 1+ images (JPG/PNG/WebP).</p>
            </Field>
          </div>
        )}
      </details>

      {/* SECTION 3: Variants */}
      <details open={openSections.variants} className="rounded-xl bg-white/40 p-3">
        <summary
          className="cursor-pointer font-semibold select-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenSections((s) => ({ ...s, variants: !s.variants }));
          }}
        >
          Variants
        </summary>

        {openSections.variants && (
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm opacity-80">
                Add sizes/stock/SKU. You can add as many rows as you want.
              </p>

              <button
                type="button"
                onClick={addVariant}
                className="px-3 py-1.5 rounded-lg bg-black/10 hover:bg-black/20 text-sm"
              >
                + Add variant
              </button>
            </div>

            {hasDuplicateSku && (
              <p className="text-sm text-red-600">Duplicate SKU detected.</p>
            )}

            <div className="flex flex-col gap-2">
              {variants.map((v, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-end rounded-xl bg-white/50 p-3"
                >

                  <div className="col-span-2">
                    <label className="text-xs pl-1">Size</label>
                    <input
                      value={v.size}
                      onChange={(e) => updateVariant(index, "size", e.target.value)}
                      className="profileFormInput shadow-sm text-sm"
                      placeholder="S / M / 42"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs pl-1">Order</label>
                    <input
                      value={v.size_order}
                      onChange={(e) => updateVariant(index, "size_order", e.target.value)}
                      inputMode="numeric"
                      className="profileFormInput shadow-sm text-sm"
                      placeholder="1"
                      required
                    />
                  </div>

                  <div className="col-span-4">
                    <label className="text-xs pl-1">SKU</label>
                    <input
                      value={v.sku}
                      onChange={(e) => updateVariant(index, "sku", e.target.value)}
                      className="profileFormInput shadow-sm text-sm"
                      placeholder="SKU-123"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs pl-1">Stock</label>
                    <input
                      value={v.stock}
                      onChange={(e) => updateVariant(index, "stock", e.target.value)}
                      inputMode="numeric"
                      className="profileFormInput shadow-sm text-sm"
                      placeholder="10"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs pl-1">Sale %</label>
                    <input
                      value={v.sale_percentage}
                      onChange={(e) => updateVariant(index, "sale_percentage", e.target.value)}
                      inputMode="numeric"
                      className="profileFormInput shadow-sm text-sm"
                      placeholder="0"
                    />
                  </div>

                  <div className="col-span-12 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      disabled={variants.length === 1}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-sm disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Important: we send variants via formData.set("variants", JSON.stringify(...)) */}
            <input type="hidden" name="variants" value="__set_in_clientAction__" />
          </div>
        )}
      </details>

      <div className="flex justify-end">
        <UploadProductButton>Upload Product</UploadProductButton>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <div className="max-w-2xl flex flex-col gap-1">
      <label className="md2:text-base text-sm pl-1">{label}</label>
      {children}
    </div>
  );
}


export default UploadProductForm
