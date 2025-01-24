import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserData.css';
import { FaTicketAlt, FaIdCard, FaSignOutAlt, FaPen } from 'react-icons/fa';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useLogout from '../../js/Logout.js'
import { useChangeUserImgMutate } from '../../hooks/UseChangeUserImgMutate.jsx'
import { updateProfileImage, updateUser } from '../../redux/user/actions.js';
import { toast } from 'react-toastify';

import MyUserData from '../../components/my-user-data/MyUserData.jsx';
import TicketsUserData from '../../components/tickets-user-data/TicketsUserData.jsx';

const UserData = () => {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { section } = useParams();

    const { mutate: uploadImage } = useChangeUserImgMutate();
    const inputFileRef = useRef(null);

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


    const logout = useLogout();

    const handleLogoutClick = () => {
        logout();
    };

    /*<MyUserData formData={formData} handleChange={handleChange}/>*/

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
            
            <TicketsUserData/>
        </div>
    );
}

export default UserData;
