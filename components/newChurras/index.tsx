'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { createNewBarbecue } from '@/lib/api';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { PatternFormat } from 'react-number-format';

Modal.setAppElement('#modal');

const NewChurras = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [valueWithAlcohol, setValueWithAlcohol] = useState(0);
  const [valueWithoutAlcohol, setValueWithoutAlcohol] = useState(0);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const resetForm = () => {
    setName('');
    setDescription('');
    setDate('');
    setValueWithAlcohol(0);
    setValueWithoutAlcohol(0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewBarbecue({
      name,
      description,
      date,
      id: new Date().getTime().toString(),
      valueWithAlcohol,
      valueWithoutAlcohol,
    }).catch((err) => console.error(err));
    resetForm();
    closeModal();
  };

  return (
    <div className="hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center z-20">
      <button
        onClick={() => openModal()}
        className="w-[282px] bg-quaternary py-8 rounded-sm"
      >
        <span className="bg-primary rounded-full flex items-center justify-center w-[90px] h-[90px] mx-auto mb-2">
          <Image src="icon_bbq.svg" width={40} height={44} alt="Trinca logo" />
        </span>
        Adicionar Churras
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute inset-0 z-30"
        className="w-3/4 bg-primary rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">Crie um novo Churras!</h1>
        <form
          className="flex flex-wrap items-center justify-between gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="title">Título</label>
            <Input
              required
              className="mt-2"
              placeholder="Título"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="title"
            />
          </div>
          <div>
            <label htmlFor="description">Descrição</label>
            <Input
              className="mt-2"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
            />
          </div>
          <div>
            <label htmlFor="date">Data</label>
            <PatternFormat
              required
              className="mt-2 block py-4 pl-5 max-w-[282px] w-full mx-auto rounded-sm shadow-xs placeholder:italic"
              placeholder="DD/MM"
              value={date}
              format="##/##"
              onChange={(e) => setDate(e.target.value)}
              id="date"
            />
          </div>
          <div>
            <label htmlFor="guests">Valor sugerido com álcool</label>
            <Input
              type="number"
              className="mt-2"
              placeholder="R$"
              value={valueWithAlcohol}
              onChange={(e) => setValueWithAlcohol(Number(e.target.value))}
              id="guests"
            />
          </div>
          <div>
            <label htmlFor="value">Valor sugerido sem álcool</label>
            <Input
              type="number"
              className="mt-2"
              placeholder="Valor em reais"
              value={valueWithoutAlcohol}
              onChange={(e) => setValueWithoutAlcohol(Number(e.target.value))}
              id="value"
            />
          </div>
          <Button type="submit" title="Criar novo Churras" />
        </form>
      </Modal>
    </div>
  );
};

export default NewChurras;
