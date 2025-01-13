import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserData.css';
import { FaTicketAlt, FaIdCard, FaSignOutAlt, FaPen } from 'react-icons/fa';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUserDataMutation } from '../../hooks/UseUserDataMutate';
import useLogout from '../../js/Logout.js'
import InputMask from 'react-input-mask'
import { useChangeUserImgMutate } from '../../hooks/UseChangeUserImgMutate.jsx'
import { updateProfileImage } from '../../redux/user/actions.js';
import { toast } from 'react-toastify';

const UserData = () => {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { section } = useParams();

    const userMutation = useUserDataMutation();
    const { mutate: uploadImage, isLoading, onSuccess, onError } = useChangeUserImgMutate();
    const [imgFile, setImgFile] = useState(null);
    const inputFileRef = useRef(null);

    const [password, setPassword] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        contactNumber: '',
        password: '',
        profileImg: '',
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name,
                email: currentUser.email,
                cpf: currentUser.cpf,
                contactNumber: currentUser.contactNumber,
                password: password,
                profileImg: currentUser.profileImg,
            })
        }
    }, [currentUser])

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

    const handleFileChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (!file) {
            console.log("Selecione uma imagem para enviar.");
            return;
        }

        uploadImage(file, {
            onSuccess: (response) => {
                dispatch(updateProfileImage(response))
                console.log("Imagem enviada com sucesso!");

            },
            onError: (error) => {
                toast.error(`Erro ao enviar imagem: ${error.message || "Algo deu errado."}`);
            },
        });
    };



    const logout = useLogout();

    const handleLogoutClick = () => {
        logout();
    };



    return (
        <div className='userDataContainer'>
            <div className='userDataControl'>
                <div className='userImgProfileContainer'>
                    <div className='userImg'>
                        <img src={formData.profileImg} alt="profileImg" />
                        <input
                            type="file"
                            ref={inputFileRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button onClick={handleButtonClick}>
                            <FaPen className='userImgEdit' />
                        </button>
                    </div>
                    <div>
                        {!!currentUser && (
                            <>
                                <h3>Olá {currentUser.name} :)</h3>
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
                        <Link className='searchBtn' to={`/recover`}>
                            <p className='changePassBtn'>alterar senha</p>
                        </Link> 
                    </div>

                </div>
                <div className='UserDataSubmit'>
                    <h3>Salvar todas as alterações</h3>
                    <p>Por questões de segurança, você precisa digitar sua senha para confirmar as alterações feitas no seu cadastro.</p>
                    <form className='UserFormSubmitControl'>
                        <div className='UserFormSubmit'>
                            <label htmlFor="senha">Senha *</label>
                            <input
                                type="password"
                                id="password1" />
                        </div>
                        <input type="submit" value="Salvar" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserData;
