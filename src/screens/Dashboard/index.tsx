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
    type: 'positive',
    title: "Desenvolvimento de sistema Web",
    amount: "R$ 18.000,00",
    category: {
        name: 'Vendas',
        icon: 'dollar-sign'
    },
    date: "15/06/2021"
},
{
    type: 'negative',
    title: "iFood",
    amount: "R$ 1.000,00",
    category: {
        name: 'Alimentação',
        icon: 'coffee'
    },
    date: "11/06/2021"
},
{
    type: 'negative',
    title: "Aluguel do apartamento",
    amount: "R$ 2.000,00",
    category: {
        name: 'Casa',
        icon: 'shopping-bag'
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
                    amount="R$ 18.000,00"
                    lastTransaction="Última entrada dia 9 de março"
                    type="up"
                />
                <HighlightCard
                    title="Saídas"
                    amount="R$ 3.000,00"
                    lastTransaction="Última saída dia 2 de março"
                    type="down"
                />
                <HighlightCard
                    title="Total"
                    amount="R$ 18.000,00"
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