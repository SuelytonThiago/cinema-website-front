import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTicketAlt, FaIdCard, FaSignOutAlt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import useLogout from '../../js/Logout.js'
import { updateProfileImage } from '../../redux/user/actions.js';
import { toast } from 'react-toastify';
import backend from '../../../api/index.ts'
import MyUserData from '../../components/my-user-data/MyUserData.jsx';
import TicketUserData from '../../components/tickets-user-data/TicketUserData.jsx';
import Cookies from 'js-cookie'
import { Exit, UserDataBtn, UserDataContainer, UserDataControl, UserDataLinks, UserImg, UserImgProfileContainer, UserInfos } from './styles.js';

const UserData = () => {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { section } = useParams();

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


    const handleFileChange = async () => {
        const file = event.target.files[0];

        if (!file) {
            toast.error('Selecione uma imagem para enviar.');
            return;
        }

        try {
            const res = await backend.fileAPI.uploadFile(file, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            dispatch(updateProfileImage(res.data));
        } catch (err) {
            toast.error('Algo deu errado');
            console.log(err);
        }
    };


    const logout = useLogout();

    const handleLogoutClick = () => {
        logout();
    };



    return (
        <UserDataContainer>
            <UserDataControl>
                <UserImgProfileContainer>
                    <UserImg>
                        <img onClick={handleButtonClick} src={formData.profileImg} alt="profileImg" />
                        <input
                            type="file"
                            ref={inputFileRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </UserImg>
                    <UserInfos>
                        {!!currentUser && (
                            <>
                                <h3>Olá, {currentUser.name} :)</h3>
                                <h3>Esta é sua conta.</h3>
                                <p>{currentUser.email}</p>
                            </>
                        )
                        }
                    </UserInfos>
                </UserImgProfileContainer>
                <UserDataLinks>
                    <UserDataBtn
                        onClick={() => navigate("/user/data/meus-ingressos")}
                        className={section === 'meus-ingressos' ? 'activatebtnSS' : ''}
                    >
                        <FaTicketAlt /> Meus Ingressos
                    </UserDataBtn>
                    <UserDataBtn
                        onClick={() => navigate("/user/data/meus-dados")}
                        className={section === 'meus-dados' ? 'activatebtnSS' : ''}
                    >
                        <FaIdCard /> Dados Pessoais
                    </UserDataBtn>
                </UserDataLinks>
                <Exit onClick={handleLogoutClick}><FaSignOutAlt /> Sair</Exit>
            </UserDataControl>
            {section === 'meus-dados' ? (
                <MyUserData formData={formData} handleChange={handleChange} />
            ) : (
                <TicketUserData />
            )}

        </UserDataContainer>
    );
}

export default UserData;
