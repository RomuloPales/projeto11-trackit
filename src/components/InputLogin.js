import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'

export default function InputLogin({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const navigate = useNavigate();

    function disable() {
        setDisableButton(true);
    }

    function enable() {
        setDisableButton(false);
    }

    function login() {
        const promise = axios.post(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',
            {
                email,
                password,
            }
        );

        promise.then((response) => {
            setUser(response.data);
            navigate('./hoje');
        });

        promise.catch(() => {
            enable();
            alert('EMAIL OU SENHA INCORRETO(A)!!');
        });
    }

    return (
        <form>
            <Inputs>
                <input
                    data-test="email-input"
                    value={email}
                    placeholder="email"
                    disabled={disableButton}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                ></input>
                <input
                    data-test="password-input"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="senha"
                    disabled={disableButton}
                    type="password"
                ></input>

                <button
                    data-test="login-btn"
                    type="submit"
                    disabled={disableButton}
                    onClick={() => {
                        disable();
                        login();
                    }}
                >
                    {!disableButton ? (
                        'Entrar'
                    ) : <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#FFFFFF" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                     />}
                </button>
            </Inputs>
        </form>
    );
}

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 160px;
    justify-content: space-evenly;
    align-items: center;
    input,
    button {
        width: 81%;
        font-size: 20px;
        height: 45px;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
    }
    button {
        text-align: center;
        color: white;
        background-color: #52b6ff;
        min-width: 84vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input::placeholder {
        text-align: left;
        padding-left: 10px;
        color: #dbdbdb;
    }
    input {
        padding-left: 10px;
    }`