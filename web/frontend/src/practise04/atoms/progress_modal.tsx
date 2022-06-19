import React from "react";

interface ConfirmModalProps {
  message?: string;
  show_modal: boolean;
}

const ProgressModal: React.FC<ConfirmModalProps> = ({
  message = "処理中です...",
  show_modal,
}) => {
  return (
    <div className={show_modal ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <div className="message is-primary">
            <progress className="progress is-medium is-primary" max="100">
              45%
            </progress>
            <div className="message-body">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;
