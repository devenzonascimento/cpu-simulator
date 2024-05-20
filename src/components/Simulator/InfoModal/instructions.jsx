const DecodeInstructions = () => {
  return (
    <>
    <h2>Instruções</h2>
    <ul>
      <li>END: Finaliza a execução do programa.</li>
      <li>ADD: Adiciona o valor do operando ao acumulador.</li>
      <li>SUB: Subtrai o valor do operando do acumulador.</li>
      <li>STORE: Armazena o valor do acumulador no endereço especificado.</li>
      <li>LOAD: Carrega no acumulador o valor do endereço especificado.</li>
      <li>JUMP: Muda a execução para a instrução no endereço especificado.</li>
      <li>
        JUMP IF ZERO: Salta para o endereço especificado se o valor do
        acumulador for zero.
      </li>
      <li>
        JUMP IF NEGATIVE: Salta para o endereço especificado se o valor do
        acumulador for negativo.
      </li>
      <li>INPUT: Recebe um valor de entrada e o armazena no acumulador.</li>
      <li>OUTPUT: Envia o valor do acumulador para a saída.</li>
    </ul>
    </>
  );
};

export default DecodeInstructions;
