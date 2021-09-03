import React from 'react';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    AppTitle
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

export function SignIn() {
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
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

            <Footer></Footer>
        </Container>
    )
}