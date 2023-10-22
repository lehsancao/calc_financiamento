import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#3498db',
    width: screenWidth,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
  },
  inputContainer: {
    width: screenWidth * 0.9,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%', // Definindo a largura do botão como 45% do contêiner
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
  },
  resultContainer: {
    width: screenWidth * 0.9,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 16,
  },
});

export default function FinanciamentoCalculator() {
  const [valorBem, setValorBem] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [quantidadeParcelas, setQuantidadeParcelas] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [jurosGerados, setJurosGerados] = useState('');
  const [mostrarResposta, setMostrarResposta] = useState(false);

  const calcularFinanciamento = () => {
    const valorBemFloat = parseFloat(valorBem);
    const taxaJurosFloat = parseFloat(taxaJuros) / 100;
    const quantidadeParcelasInt = parseInt(quantidadeParcelas);

    const valorParcela = (valorBemFloat * taxaJurosFloat) / (1 - Math.pow(1 + taxaJurosFloat, -quantidadeParcelasInt));
    const jurosGerados = valorParcela * quantidadeParcelasInt - valorBemFloat;

    setValorParcela(valorParcela.toFixed(2));
    setJurosGerados(jurosGerados.toFixed(2));
    setMostrarResposta(true); // Exibir a resposta após o cálculo
  };

  const limparCampos = () => {
    setValorBem('');
    setTaxaJuros('');
    setQuantidadeParcelas('');
    setValorParcela('');
    setJurosGerados('');
    setMostrarResposta(false); // Ocultar a resposta ao limpar
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Financiamento</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Valor do financiamento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor"
          onChangeText={text => setValorBem(text)}
          value={valorBem}
          keyboardType="numeric"
        />
        <Text style={styles.inputLabel}>Taxa de juros ao mês (%):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a taxa"
          onChangeText={text => setTaxaJuros(text)}
          value={taxaJuros}
          keyboardType="numeric"
        />
        <Text style={styles.inputLabel}>Quantidade de parcelas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade"
          onChangeText={text => setQuantidadeParcelas(text)}
          value={quantidadeParcelas}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Calcular"
            onPress={calcularFinanciamento}
            style={styles.button}
            color="#3498db"
          />
          <Button
            title="Limpar"
            onPress={limparCampos}
            style={styles.button}
            color="#d9534f"
          />
        </View>
      </View>
      {mostrarResposta && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Resposta:</Text>
          <Text style={styles.resultValue}>
            {`${quantidadeParcelas} parcelas de R$${valorParcela} com juros de R$${jurosGerados}, resultando em um total de R$${parseFloat(valorBem) + parseFloat(jurosGerados)}`} 
          </Text>
        </View>
      )}
    </View>
  );
}
