import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';

import styles from './Personal.module.scss';
import { fetchPersonalImage } from '../../actions/actions';
import blankImage from '../../images/imageBlank.svg';
import PersonalData from './PersonalData';
import PersonalPwr from './PersonalPwr';
import Button from '../UI/Button';

class Personal extends Component {
  constructor(props) {
    super(props);
    this.inputFoto = React.createRef();
    this.state = {
      currStage: 'main',
      blankImage: false,
      fotoMsg: 'Фотографии jpeg или png, максимальный размер 2 МБ',
      fotoMsgError: false,
      elements: {
        fotoBtns: { main: true, editData: false, editPwr: false },
        btnsEdit: { main: true, editData: false, editPwr: false }, //edit psw and edit data block
        dataInputsReadOnly: { main: true, editData: false, editPwr: true },
        personalPwr: { main: false, editData: false, editPwr: true },
        personalData: { main: true, editData: true, editPwr: false },
        breadCrumbsExtra: {
          main: null,
          editData: 'Редактирование данных',
          editPwr: 'Изменение пароля',
        },
      },
    };
  }

  fotoUploadHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (
        file.size <= 1048576 * 2 &&
        (file.type === 'image/png' || file.type === 'image/jpeg')
      ) {
        const localImageUrl = window.URL.createObjectURL(file);
        this.props.fetchPersonalImage(localImageUrl);
        window.URL.revokeObjectURL(file);
        this.setState({
          blankImage: false,
          fotoMsg: 'Фотографии jpeg или png, максимальный размер 2 МБ',
          fotoMsgError: false,
        });
      } else if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
        this.setState({
          fotoMsg:
            'Не удалось загрузить: выберете файл с расширением jp(e)g или png.',
            fotoMsgError: true,
        });
      } else if (file.size > 1048576 * 2) {
        this.setState({
          fotoMsg: 'Не удалось загрузить: выбран слишком большой файл.',
          fotoMsgError: true,
        });
      }
    }
  };

  fotoDelete = () => {
    this.props.fetchPersonalImage(blankImage);
    this.setState({
      blankImage: true,
      fotoMsg: 'Фотографии jpeg или png, max 2 МБ',
    });
  };

  changeStage = (e, nextStage) => {
    this.setState({ currStage: nextStage });
  };

  render() {
    const { currStage, elements } = this.state;

    const breadCrumbsExtra = elements.breadCrumbsExtra[currStage] ? (
      <span>{elements.breadCrumbsExtra[currStage]}</span>
    ) : null;

    const fotoBtns = elements.fotoBtns[currStage] ? (
      <div className={styles.FotoButtons}>
        <div className={styles.BtnUploadCont}>
          <div className={styles.BtnUpload}>
            <input
            type='file'
            ref={this.inputFoto}
            onChange={this.fotoUploadHandler}
          />
          
          <Button
            clickHandler={(e) => this.inputFoto.current.click()}
            btnTypes={['Next']}
            btnName='Загрузить фото'
          />
          </div>
          
          <div className={clsx(styles.BtnUploadComment, this.state.fotoMsgError && styles.BtnUploadError)}>{this.state.fotoMsg}</div>
        </div>
        <div className={styles.BtnDelete}>
          <Button
            clickHandler={this.fotoDelete}
            btnTypes={['Next']}
            btnName='Удалить фото'
            disabled={this.state.blankImage}
          />
        </div>
      </div>
    ) : null;
    /** edit personal data form */
    const personalData = elements.personalData[currStage] ? (
      <PersonalData
        renderButtons={!elements.btnsEdit[currStage]}
        dataInputsReadOnly={elements.dataInputsReadOnly[currStage]}
        changeStage={this.changeStage}
      />
    ) : null;

    const personalPwr = elements.personalPwr[currStage] ? (
      <PersonalPwr
        renderButtons={!elements.btnsEdit[currStage]}
        changeStage={this.changeStage}
      />
    ) : null;

    /** buttons Edit Pwr and Edit Data */
    const buttons = elements.btnsEdit[currStage] ? (
      <div className={styles.Buttons}>
        <Button
          clickHandler={(e) => this.changeStage(e, 'editPwr')}
          btnTypes={['Next']}
          btnName='Изменить пароль'
        />
        <Button
          clickHandler={(e) => this.changeStage(e, 'editData')}
          btnTypes={['Next']}
          btnName='Изменить Данные'
        />
      </div>
    ) : null;

    return (
      <div className={styles.Personal}>
        <div className={styles.BreadCrumbs}>
          <span>ЛИЧНЫЕ ДАННЫЕ</span>
          {breadCrumbsExtra}
        </div>
        <div className={styles.Contents}>
          <div className={styles.Foto}>
            <div className={styles.FotoPicture}>
              <img className={styles.Picture} width={150} src={this.props.personalImage} />
            </div>
            {fotoBtns}
          </div>
          <div className={styles.Form}>
            {personalData}
            {personalPwr}
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

Personal.propTypes = {
  personalImage: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    personalImage: state.personalImage,
  };
};

const mapDispatchToProps = {
  fetchPersonalImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personal);
