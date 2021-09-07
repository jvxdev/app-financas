import React, { useContext } from 'react';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { AuthContext } from '../../AuthContext';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';
import { da } from 'date-fns/locale';

export function SignIn() {
    const data = useContext(AuthContext);

    console.log(data);
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