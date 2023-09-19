'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { createNewGuest } from '@/lib/api';
import { BarbecueWithGuests } from '@/utils/types';
import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal');

const NewGuest = ({ barbecue }: { barbecue: BarbecueWithGuests }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [valueToPay, setValueToPay] = useState(0);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const valueWithAlcoholToPay = barbecue.valueWithAlcohol;
  const valueWithoutAlcoholToPay = barbecue.valueWithoutAlcohol;

  const resetForm = () => {
    setName('');
    setValueToPay(0);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewGuest({
      name,
      valueToPay: valueToPay,
      barbecueId: barbecue.id,
    })
      .then(() => location.reload())
      .catch((err) => console.error(err));
    resetForm();
    closeModal();
  };

  return (
    <div className="hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center mt-9 z-20">
      <Button onClick={() => openModal()} title="Adicionar participante" />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute inset-0 z-30"
        className="w-3/4 bg-primary rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">Crie um novo Churras!</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center justify-between w-full">
            <div className="w-full md:w-auto">
              <label htmlFor="name">Nome</label>
              <Input
                required
                className="mt-2"
                placeholder="Nome do participante"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
              />
            </div>
            <div className="mt-3">
              <input
                type="radio"
                className="mt-2 mr-2"
                name="valueToPay"
                value={valueWithAlcoholToPay}
                onChange={() => setValueToPay(valueWithAlcoholToPay)}
                id="guests"
              />
              <label htmlFor="guests">
                Valor c/ álcool: R$ {valueWithAlcoholToPay}
              </label>
            </div>
            <div className="mt-3">
              <input
                type="radio"
                className="mt-2 mr-2"
                name="valueToPay"
                value={valueWithoutAlcoholToPay}
                onChange={() => setValueToPay(valueWithoutAlcoholToPay)}
                id="value"
              />
              <label htmlFor="value">
                Valor sem álcool: R$ {valueWithoutAlcoholToPay}
              </label>
            </div>
            <div className="mt-3">
              <label htmlFor="valueToPay">Valor de pagamento em R$:</label>
              <Input
                required
                type="number"
                disabled
                className="mt-2"
                placeholder="Valor em reais"
                value={valueToPay}
                onChange={(e) => setValueToPay(Number(e.target.value))}
                id="valueToPay"
              />
            </div>
          </div>
          <div className="mt-4">
            <Button type="submit" title="Salvar" />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewGuest;
