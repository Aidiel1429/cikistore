import Loading from "@/app/components/loadingButton";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface TambahProps {
  setSukses: (value: boolean) => void;
  setError: (value: boolean) => void;
  setMessage: (message: string) => void;
  reload: () => void;
}

const Tambah = ({ setSukses, setError, setMessage, reload }: TambahProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nama, setNama] = useState("");

  // State untuk validasi setiap field
  const [errors, setErrors] = useState({
    nama: "",
  });

  const handleTambah = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Reset error messages
    const newErrors = {
      pendapatan: "",
      modal: "",
      nama: "",
      namaPelanggan: "",
      kategori: "",
      tanggal: "",
      status: "",
    };

    let isValid = true;

    // Validasi Nama Barang
    if (nama.trim().length === 0) {
      newErrors.nama = "Nama Transaksi harus diisi!";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("nama", nama);

      const res = await axios.post(`/api/transaksi`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "berhasil") {
        setSukses(true);
        setError(false);
        setMessage("Berhasil menambahkan data Transaksi");
        setNama("");
        setOpen(false);
        reload();
      } else {
        setError(true);
        setSukses(false);
        setMessage("Gagal menambahkan data penjualan");
        setOpen(false);
      }
    } catch (error) {
      setError(true);
      setSukses(false);
      setMessage("Gagal terhubung ke server!");
      setOpen(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        className="border p-3 rounded-md my-3 text-base font-semibold hover:border-slate-800 transition-all"
        onClick={toggleModal}
      >
        Tambah Transaksi
      </button>
      <dialog id="my_modal_1" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Transaksi!</h3>
          <form className="mt-3" onSubmit={handleTambah}>
            <div>
              <label className="label">Nama Transaksi</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              {errors.nama && <p className="text-red-500">{errors.nama}</p>}
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={toggleModal}>
                Tutup
              </button>
              <button className="btn btn-primary text-white" type="submit">
                {loading ? <Loading /> : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Tambah;
