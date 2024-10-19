import { IonCard, IonCardContent } from '@ionic/react';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300">
      <IonCard className="w-full max-w-md rounded-lg shadow-lg">
        <IonCardContent>
          {/* Modal header */}
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-900">Terms of Service</h3>
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 space-y-4">
            <p className="text-base leading-relaxed text-gray-500">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>

          {/* Modal footer */}
          <div className="flex justify-end mt-6 border-t border-gray-200 pt-4">
            <button
              onClick={closeModal}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              I accept
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="ml-3 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
            >
              Decline
            </button>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};


export default Modal;
