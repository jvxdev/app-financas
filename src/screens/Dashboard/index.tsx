import React from 'react';

import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards
} from './styles';

import { RFValue } from 'react-native-responsive-fontsize';
import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard() {
    return (
    <Container>
        <Header>
            <UserWrapper>
                <UserInfo>
                    <Photo 
                        source={{ uri: 'https://avatars.githubusercontent.com/u/54956887?v=4'}}
                    />
                    <User>
                        <UserGreeting>Olá,</UserGreeting>
                        <UserName>João</UserName>
                    </User>
                </UserInfo>
                <Icon name="power"/>
            </UserWrapper>
        </Header>
        <HighlightCards>
            <HighlightCard 
            title="Entradas" 
            amount="R$ 14.300,00" 
            lastTransaction="Última entrada dia 9 de março"
            type="up"
            />
            <HighlightCard 
            title="Saídas" 
            amount="R$ 1.300,00" 
            lastTransaction="Última saída dia 2 de março"
            type="down"
            />
            <HighlightCard 
            title="Total" 
            amount="R$ 15.600,00" 
            lastTransaction="02 à 09 de março"
            type="total"
            />
        </HighlightCards>
    </Container>
    )
}