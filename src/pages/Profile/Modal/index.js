import Modal from "react-modal";

const TemplateModal = ({ isOpen, onRequestClose, onChooseTemplate }) => {
  const handleTemplateSelect = (template) => {
    onChooseTemplate(template);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Choose Template"
    >
      <h2>Choose a ReactJS Template</h2>
      <button onClick={() => handleTemplateSelect("OK")}>OK</button>
      <button onClick={() => handleTemplateSelect("Cancel")}>Cancel</button>
    </Modal>
  );
};

export default TemplateModal;
