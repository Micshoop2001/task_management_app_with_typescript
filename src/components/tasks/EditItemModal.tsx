type EditItemModalProps = {
  isOpen: boolean;
  task: string;
  description: string;
  onTaskChange: (task: string) => void;
  onDescriptionChange: (description: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  task,
  description,
  onTaskChange,
  onDescriptionChange,
  onSave,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <input value={task} onChange={(e) => onTaskChange(e.target.value)} />
        <input
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditItemModal;
