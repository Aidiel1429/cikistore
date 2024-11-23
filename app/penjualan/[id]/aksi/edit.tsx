import Loading from "@/app/components/loadingButton";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

interface TambahProps {
  setSukses: Function;
  setError: Function;
  setMessage: Function;
  reload: Function;
  data: {
    id: number;
    pendapatan: string;
    modal: string;
    nama: string;
    namaPelanggan: string;
    kategori: string;
    tanggal: string | Date;
    status: string;
  };
}

const Edit = ({
  setSukses,
  setError,
  setMessage,
  reload,
  data,
}: TambahProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  // State untuk menyimpan nilai input
  const [pendapatan, setPendapatan] = useState(data.pendapatan);
  const [modal, setModal] = useState(data.modal);
  const [nama, setNama] = useState(data.nama);
  const [namaPelanggan, setNamaPelanggan] = useState(data.namaPelanggan);
  const [kategori, setKategori] = useState(data.kategori);
  const [tanggal, setTanggal] = useState(
    new Date(data.tanggal).toISOString().split("T")[0]
  );

  const [status, setStatus] = useState(data.status);
  const [transaksiId, setTransaksiId] = useState(Number(id));

  // State untuk validasi setiap field
  const [errors, setErrors] = useState({
    pendapatan: "",
    modal: "",
    nama: "",
    namaPelanggan: "",
    kategori: "",
    tanggal: "",
    status: "",
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

    // Validasi Pendapatan
    if (String(pendapatan).trim().length === 0) {
      newErrors.pendapatan = "Pendapatan harus diisi!";
      isValid = false;
    } else if (isNaN(Number(pendapatan))) {
      newErrors.pendapatan = "Pendapatan harus berupa angka!";
      isValid = false;
    }

    // Validasi Modal
    if (String(modal).trim().length === 0) {
      newErrors.modal = "Modal harus diisi!";
      isValid = false;
    } else if (isNaN(Number(modal))) {
      newErrors.modal = "Modal harus berupa angka!";
      isValid = false;
    }

    // Validasi Nama Barang
    if (String(nama).trim().length === 0) {
      newErrors.nama = "Nama barang harus diisi!";
      isValid = false;
    }

    // Validasi Nama Pelanggan
    if (String(namaPelanggan).trim().length === 0) {
      newErrors.namaPelanggan = "Nama pelanggan harus diisi!";
      isValid = false;
    }

    // Validasi Kategori
    if (String(kategori).trim().length === 0 || kategori === "Pilih Kategori") {
      newErrors.kategori = "Kategori harus dipilih!";
      isValid = false;
    }

    // Validasi Tanggal
    if (String(tanggal).trim().length === 0) {
      newErrors.tanggal = "Tanggal harus diisi!";
      isValid = false;
    }

    // Validasi Status
    if (String(status).trim().length === 0 || status === "Pilih Status") {
      newErrors.status = "Status harus dipilih!";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const formattedTanggal = new Date(tanggal).toISOString();

      const res = await axios.put(`/api/penjualan/${data.id}`, {
        pendapatan: Number(pendapatan) || data.pendapatan,
        modal: Number(modal) || data.modal,
        nama: nama || data.nama,
        namaPelanggan: namaPelanggan || data.namaPelanggan,
        kategori: kategori || data.kategori,
        tanggal: formattedTanggal || data.tanggal,
        status: status || data.status,
        transaksiId: Number(transaksiId),
      });

      if (res.data.pesan === "berhasil") {
        setSukses(true);
        setError(false);
        setMessage("Berhasil mengedit data penjualan");
        setPendapatan("");
        setModal("");
        setNama("");
        setNamaPelanggan("");
        setKategori("");
        setTanggal("");
        setStatus("");
        setOpen(false);
        reload();
      } else {
        setError(true);
        setSukses(false);
        setMessage("Gagal mengedit data penjualan");
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
      <button className="text-yellow-500 text-xl" onClick={toggleModal}>
        <FiEdit />
      </button>
      <dialog id="my_modal_1" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Penjualan!</h3>
          <form className="mt-3" onSubmit={handleTambah}>
            <input
              type="hidden"
              value={transaksiId}
              onChange={(e) => setTransaksiId(Number(e.target.value))}
            />
            <div className="border border-slate-300 p-3 rounded-lg mb-3">
              <label className="flex items-center gap-2 text-green-500 border-b border-slate-400 py-3">
                Rp
                <input
                  type="text"
                  className="grow border-none outline-none"
                  placeholder="Pendapatan"
                  value={pendapatan}
                  onChange={(e) => setPendapatan(e.target.value)}
                  inputMode="numeric"
                />
              </label>
              {errors.pendapatan && (
                <p className="text-red-500">{errors.pendapatan}</p>
              )}
              <label className="flex items-center gap-2 text-red-500 border-b border-slate-400 py-3">
                Rp
                <input
                  type="text"
                  className="grow border-none outline-none"
                  placeholder="Modal"
                  value={modal}
                  onChange={(e) => setModal(e.target.value)}
                  inputMode="numeric"
                />
              </label>
              {errors.modal && <p className="text-red-500">{errors.modal}</p>}
            </div>
            <div>
              <label className="label">Nama Barang</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              {errors.nama && <p className="text-red-500">{errors.nama}</p>}
            </div>
            <div>
              <label className="label">Nama Pelanggan</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={namaPelanggan}
                onChange={(e) => setNamaPelanggan(e.target.value)}
              />
              {errors.namaPelanggan && (
                <p className="text-red-500">{errors.namaPelanggan}</p>
              )}
            </div>
            <div>
              <label className="label">Kategori</label>
              <select
                className="select select-bordered w-full"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option disabled value="">
                  Pilih Kategori
                </option>
                <option value={"Pulsa"}>Pulsa</option>
                <option value={"Voucher Game"}>Voucher Game</option>
                <option value={"Uang Elektronik"}>Uang Elektronik</option>
              </select>
              {errors.kategori && (
                <p className="text-red-500">{errors.kategori}</p>
              )}
            </div>
            <div>
              <label className="label">Tanggal</label>
              <input
                type="date"
                className="input input-bordered w-full text-black"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
              {errors.tanggal && (
                <p className="text-red-500">{errors.tanggal}</p>
              )}
            </div>
            <div>
              <label className="label">Status</label>
              <select
                className="select select-bordered w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option disabled value="">
                  Pilih Status
                </option>
                <option value={"Lunas"}>Lunas</option>
                <option value={"Belum Lunas"}>Belum Lunas</option>
              </select>
              {errors.status && <p className="text-red-500">{errors.status}</p>}
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={toggleModal}>
                Tutup
              </button>
              <button className="btn btn-warning text-white" type="submit">
                {loading ? <Loading /> : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Edit;