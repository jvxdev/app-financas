import React from 'react';
import { Text } from 'react-native';

import { 
    Container,
    Header
} from './styles';

export function Dashboard() {
    return (
    <Container>
        <Header>
            <Text>Olá!</Text>
        </Header>
    </Container>
    )
}