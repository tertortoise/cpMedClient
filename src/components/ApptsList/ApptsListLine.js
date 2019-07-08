import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../UI/Button';
import Modal from '../UI/Modal';
import ModalConfirm from '../UI/ModalConfirm';
import styles from './ApptsListLine.module.scss';

class ApptsListLine extends Component {
  state = {
    modalOpen: false,
  };

  /** modal management */
  toggleScrollLock = () =>
    document.querySelector('html').classList.toggle('u-lock-scroll');

  modalOnOpen = () => {
    this.setState({ modalOpen: true }, () => {
      this.closeModalButton.focus();
    });
    this.toggleScrollLock();
  };

  modalOnClose = (e, type) => {
    this.setState({ modalOpen: false });
    this.openModalButton && this.openModalButton.focus();
    this.toggleScrollLock();
    if (type === 'confirm') {
      this.props.deleteApptHandler(this.props.appt.apptId);
    }
  };

  modalOnClickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.modalOnClose();
  };

  render() {
    const { appt } = this.props;
    let buttonBlock,
      classNames = [styles.ListLine, styles[this.props.apptStatus]];
    if (this.props.showButtons && this.props.apptStatus === 'Active') {
      buttonBlock = (
        <span>
          <span>
            <Button
              btnName='Редактировать'
              selected={false}
              btnTypes={['Inline']}
              clickHandler={(e) => this.props.editApptHandler(e, appt.apptId)}
            />
          </span>
          <span>
            <Button
              btnName='Отменить'
              selected={false}
              btnTypes={['Inline']}
              clickHandler={(e) => this.modalOnOpen()}
              buttonRef={(node) => (this.openModalButton = node)}
            />
          </span>
        </span>
      );
    }

    return (
      <Fragment>
        <div className={classNames.join(' ')}>
          <span>{appt.apptId}</span>
          <span>{appt.docFullName}</span>
          <span>{appt.speciality}</span>
          <span>{appt.dateTime}</span>
          {buttonBlock}
        </div>
        {this.state.modalOpen && (
          <Modal>
            <ModalConfirm
              appt={appt}
              modalOnClickAway={this.modalOnClickAway}
              modalOnClose={this.modalOnClose}
              buttonRef={(node) => (this.closeModalButton = node)}
              modalRef={(node) => (this.ModalNode = node)}
            >
              <div className={styles.ConfirmMessage}>
                <div>Вы отменяете прием врача:</div>
                <div>{appt.apptId}</div>
                <div>{appt.docFullName}</div>
                <div>{appt.speciality}</div>
                <div>{appt.dateTime}</div>
                <div>Подтверждаете?</div>
              </div>
            </ModalConfirm>
          </Modal>
        )}
      </Fragment>
    );
  }
}

ApptsListLine.propTypes = {
  appt: PropTypes.object,
  deleteApptHandler: PropTypes.func,
  editApptHandler: PropTypes.func,
  apptStatus: PropTypes.oneOf(['Active', 'Past']),
  showButtons: PropTypes.bool,
};

export default ApptsListLine;
