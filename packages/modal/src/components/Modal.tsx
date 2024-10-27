import downloadIcon from '../assets/download-icon.svg';
import './index.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
}
  
  
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
        <div className="modal">
            <div className="modal-header">
                <h2>동영상 업로드</h2>
            </div>
  
            <div className="upload-area" role="button" aria-label="동영상 파일을 선택하거나 드래그 앤 드롭하여 첨부하세요">
                <div className="upload-icon">
                    <img src={downloadIcon} alt="Download Icon" />
                </div>
                <p>
                    <strong>동영상 파일을 선택</strong>하거나 이곳으로 드래그 앤 드롭하세요.
                </p>
            </div>
  
            <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={onCancel || onClose}>
                    취소
                </button>
                <button type="button" className="confirm-button" onClick={onConfirm}>
                    확인
                </button>
            </div>
        </div>
    );
};
  
export default Modal;
