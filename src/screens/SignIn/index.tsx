import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';


export function SignIn() {
    const { 
        user,
        signInWithGoogle,
        signInWithApple
    } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);

            Alert.alert('Não foi possível entrar com a conta Google.')
        }    
    }

    async function handleSignInWithApple() {
        try {
            await signInWithApple();
        } catch (error) {
            console.log(error);

            Alert.alert('Não foi possível entrar com a conta Apple.')
        }    
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(150)}
                        height={RFValue(90)}
                    />
                    <Title>Controle suas finanças {'\n'}
                        de um jeito simples!
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Entre no aplicativo com {'\n'}
                    uma das contas abaixo.
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />

                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}