import React, { useRef } from 'react'
import { Container, FileContainer, FileInfo, FileInput, Icon, P, Span, XBtn } from './styles'
import { FaFileAlt, FaImage, FaTimes } from 'react-icons/fa'
import { useTranslation } from 'react-i18next';
import { MessageError, Paragraph } from '../../Paragraph';
import { FaExclamationCircle } from 'react-icons/fa';

const InputFile = ({ setFile, file, setErrors, fileName, h3, error }) => {

    const { t } = useTranslation();

    const fileInputRef = useRef(null);

    const clearFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setErrors((prevErr) => ({
            ...prevErr,
            [fileName]: '',
        }))
    };

    return (
        <Container>
            <Paragraph>{h3}</Paragraph>
            <FileInput htmlFor={fileName}>
                {t("selecione-um-arquivo")}
            </FileInput>
            <p>{error &&  (<MessageError>{error}</MessageError>)}</p>
            <input
                id={fileName}
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {file && (
                <FileContainer>
                    <FileInfo>
                        {file.type.startsWith("image/") ? (
                            <FaImage size={20} color="#007BFF" />
                        ) : (
                            <FaFileAlt size={20} color="#333" />
                        )}
                        <Span>{file.name}</Span>
                    </FileInfo>
                    <XBtn onClick={clearFile}>
                        <FaTimes />
                    </XBtn>
                </FileContainer>
            )}
        </Container>
    );
}

export default InputFile;
