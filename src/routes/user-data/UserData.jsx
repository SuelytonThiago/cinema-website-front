import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserData.css';
import { FaTicketAlt, FaIdCard, FaSignOutAlt, FaPen } from 'react-icons/fa';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUserDataMutation } from '../../hooks/UseUserDataMutate';
import useLogout from '../../js/Logout.js'
import InputMask from 'react-input-mask'
import { useChangeUserImgMutate } from '../../hooks/UseChangeUserImgMutate.jsx'
import { updateProfileImage, updateUser } from '../../redux/user/actions.js';
import { toast } from 'react-toastify';
import CreatePasswordProfile from '../../components/change-password-profile/CreatePasswordProfile.jsx';

const UserData = () => {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showChangePassWindow, setShowChangePassWindow] = useState(false)

    const { section } = useParams();

    const { mutate: userMutation } = useUserDataMutation();
    const { mutate: uploadImage } = useChangeUserImgMutate();
    const inputFileRef = useRef(null);

    const [password, setPassword] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        contactNumber: '',
        profileImg: '',
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name,
                email: currentUser.email,
                cpf: currentUser.cpf,
                contactNumber: currentUser.contactNumber,
                profileImg: currentUser.profileImg,
            })
        }
    }, [currentUser])

    const handleShowWindow = () => {
        setShowChangePassWindow(!showChangePassWindow);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleButtonClick = () => {
        inputFileRef.current.click();
    };

    const handleFileChange = () => {
        const file = event.target.files[0];

        if (!file) {
            toast.error('Selecione uma imagem para enviar.');
            return;
        }

        uploadImage(file, {
            onSuccess: (response) => {
                dispatch(updateProfileImage(response));
            },
            onError: () => {
                toast.error('Algo deu errado');
            },
        });
    };

    const handleChangeUserData = () => {
        userMutation({ formData, password }, {
            onSuccess: () => {
                dispatch(updateUser(formData))
            },
            onError: () => {
                toast.error('Algo deu errado');
            },
        }
        );
    }



    const logout = useLogout();

    const handleLogoutClick = () => {
        logout();
    };



    return (
        <div className='userDataContainer'>
            <div className='userDataControl'>
                <div className='userImgProfileContainer'>
                    <div className='userImg'>
                        <img onClick={handleButtonClick} src={formData.profileImg} alt="profileImg" />
                        <input
                            type="file"
                            ref={inputFileRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='UserInfos'>
                        {!!currentUser && (
                            <>
                                <h3>Olá, {currentUser.name} :)</h3>
                                <h3>Esta é sua conta.</h3>
                                <p>{currentUser.email}</p>
                            </>
                        )
                        }
                    </div>
                </div>
                <div className='userDataLinks'>
                    <button
                        onClick={() => navigate("/user/data/meus-ingressos")}
                        className={`userDataBtn ${section === 'meus-ingressos' ? 'activatebtnSS' : ''}`}
                    >
                        <FaTicketAlt /> Meus Ingressos
                    </button>
                    <button
                        onClick={() => navigate("/user/data/meus-dados")}
                        className={`userDataBtn ${section === 'meus-dados' ? 'activatebtnSS' : ''}`}
                    >
                        <FaIdCard /> Dados Pessoais
                    </button>
                </div>
                <button className='userDataOutBtn' onClick={handleLogoutClick}><FaSignOutAlt /> Sair</button>
            </div>
            <div className='UserDataForm'>
                <h3>Dados Pessoais</h3>
                <div className='UserFormControl'>
                    <div className='UserFormInput'>
                        <label htmlFor="name">Nome *</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            name='name'
                            onChange={handleChange} />
                    </div>
                    <div className='UserFormInput disabledInput'>
                        <label htmlFor="email">Email *</label>
                        <input
                            type="text"
                            id="email"
                            name='email'
                            value={formData.email}
                            disabled />
                    </div>
                    <div className='UserFormInput disabledInput'>
                        <label htmlFor="cpf">CPF *</label>
                        <input
                            type="text"
                            id="cpf"
                            name='cpf'
                            value={formData.cpf}
                            onChange={handleChange}
                            disabled />
                    </div>
                    <div className='UserFormInput'>
                        <label htmlFor="contactNumber">Telefone *</label>
                        <InputMask
                            mask='(99)99999-9999'
                            value={formData.contactNumber}
                            name='contactNumber'
                            id="contactNumber"
                            onChange={handleChange}

                        />
                    </div>
                    <div className='passwordInputContainer'>
                        <div className='UserFormInput disabledInput'>
                            <label htmlFor="senha">Senha *</label>
                            <input
                                type="password"
                                id="password"
                                disabled
                                value='***********' />
                        </div>
                        <button className='changePassBtn' onClick={handleShowWindow}>alterar senha</button>

                    </div>

                </div>
                <div className='UserDataSubmit'>
                    <h3>Salvar todas as alterações</h3>
                    <p>Por questões de segurança, você precisa digitar sua senha para confirmar as alterações feitas no seu cadastro.</p>
                    <div className='UserFormSubmitControl'>
                        <div className='UserFormSubmit'>
                            <label htmlFor="senha">Senha *</label>
                            <input
                                type="password"
                                id="verifyPassword"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button disabled={!password} onClick={handleChangeUserData}>Salvar</button>
                    </div>
                </div>
                {showChangePassWindow && (
                    <CreatePasswordProfile handleShowWindow={handleShowWindow} />
                )}

            </div>
        </div>
    );
}

export default UserData;
