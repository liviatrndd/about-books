import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AboutArea,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [book, setBook] = useState('');
    const [about, setAbout] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`volumes?q=${encodeURIComponent(book)}&key=AIzaSyCeNGfUYiD5GNkBc-ZtacvUxUavOc23nFw`);
            console.log(data)

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um livro existente');
            } else {
                const bookInfo = data.items[0].volumeInfo;
                const filteredData = {
                    title: bookInfo.title,
                    authors: bookInfo.authors,
                    categories: bookInfo.categories ?? 'Sem definição',
                    pageCount: bookInfo.pageCount,
                    publisher: bookInfo.publisher ?? 'Informação indisponível',
                    textSnippet: bookInfo.description
                };
                setAbout(filteredData);
            }

            }

            catch (error) {
            Alert.alert('Buscar', 'Erro ao buscar livro');
        }
    };

    async function handleLimpar() {
        setAbout(null);
        setBook('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!about &&
                    <Input
                        keyboardType="default"
                        maxLength={30}
                        onChangeText={setBook}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o livro que deseja encontrar"
                        placeholderTextColor="#A52A2A"
                        value={book}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={about ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {about ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {about &&
                <AboutArea>
                    <Text>Título: {about.title}</Text>
                    <Text>Autor: {about.authors[0]}</Text>
                    <Text>Quantidade de páginas: {about.pageCount}</Text>
                    <Text>Categoria: {about.categories}</Text>
                    <Text>Editora: {about.publisher}</Text>
                </AboutArea>
            }
        </Container>
    );
}