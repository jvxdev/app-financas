import React from 'react';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';


import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    AppTitle,
    FooterWrapper
} from './styles';

export function SignIn() {
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(150)}
                        height={RFValue(90)}
                    />

                    <AppTitle>finances</AppTitle>

                    <Title>Controle suas finanças {'\n'} 
                         de um jeito fácil
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Entre no aplicativo com {'\n'} 
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                    />

                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}