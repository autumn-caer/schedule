import React from "react";

interface ConfirmModalProps {
  message?: string;
  show_modal: boolean;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
  confirmSubmit: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message = "この内容で登録/更新します。よろしいでしょうか?",
  show_modal,
  setShowModal,
  confirmSubmit,
}) => {
  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className={show_modal ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={() => hideModal()}></div>
      <div className="modal-content">
        <div className="box">
          <div className="message is-primary">
            <div className="message-body">{message}</div>
          </div>

          <div className="columns">
            <div className="column is-three-fifths"></div>
            <div className="column is-one-fifth">
              <button
                className="button is-primary"
                onClick={() => confirmSubmit()}
              >
                OK
              </button>
            </div>
            <div className="column is-one-fifth">
              <button className="button" onClick={() => hideModal()}>
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => hideModal()}
      ></button>
    </div>
  );
};

export default ConfirmModal;
