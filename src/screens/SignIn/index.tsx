import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import theme from '../../global/styles/theme';

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
    const [isLoading, setIsLoading] = useState(false);

    const {
        signInWithGoogle,
        signInWithApple
    } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true);

            return signInWithGoogle();
        } catch (error) {
            console.log(error);

            Alert.alert('Não foi possível entrar com a conta Google.')
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true);

            return signInWithApple();
        } catch (error) {
            console.log(error);

            Alert.alert('Não foi possível entrar com a conta Apple.')
        } finally {
            setIsLoading(false);
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

                {isLoading &&
                    <ActivityIndicator
                        color={theme.colors.shape}
                        style={{ marginTop: 18 }}
                    />}
            </Footer>
        </Container>
    )
}