import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';

export function HighlightCard() {
    return (
        <Container>
            <Header>
                <Title>Entradas</Title>
                <Icon name="arrow-up-circle" />
            </Header>

            <Footer>
                <Amount>
                    R$ 18.500,00
                </Amount>
                <LastTransaction>Última entrada dia 15 de junho</LastTransaction>
            </Footer>
        </Container>
    )
}