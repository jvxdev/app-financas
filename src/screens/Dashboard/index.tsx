import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

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
    HighlightCards,
    Transactions,
    Title,
    TransactionsList
} from './styles';

const data = [{
    title: "Desenvolvimento de site",
    amount: "R$ 18.000,00",
    category: {
        name: 'Vendas',
        icon: 'dollar-sign'
    },
    date: "15/06/2021"
},
{
    title: "Desenvolvimento de aplicativo",
    amount: "R$ 12.000,00",
    category: {
        name: 'Vendas',
        icon: 'dollar-sign'
    },
    date: "11/06/2021"
},
{
    title: "Desenvolvimento de App Desktop",
    amount: "R$ 8.000,00",
    category: {
        name: 'Vendas',
        icon: 'dollar-sign'
    },
    date: "02/06/2021"
}
];

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/54956887?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>João</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
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

            <Transactions>
                <Title>Listagem</Title>
                <TransactionsList
                    data={data}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                    showsVerticalScrollIndicator={false}
                />

            </Transactions>

        </Container>
    )
}