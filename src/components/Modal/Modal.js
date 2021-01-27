import Button from '../UI/Button/Button';
import styles from './Modal.module.css';

const Modal = props => {
	const visbilityClasses = [styles.Container];
	if (props.visible) {
		visbilityClasses.push(styles.SlideIn);
	} else {
		visbilityClasses.push(styles.SlideOut);
	}

	return (
		<div className={visbilityClasses.join(' ')}>
			<div className={styles.ModalContent}>
				<div className={styles.ModalHeader}>
					<h1>{props.header}</h1>
				</div>
				<div className={styles.ModalBody}>{props.children}</div>
				<div className={styles.ModalFooter}>
					<Button
						value='Close'
						clicked={props.btnClicked}
						cssForButton={['Btn-Default', 'Btn-Medium']}
					/>
				</div>
			</div>
		</div>
	);
};

export default Modal;
