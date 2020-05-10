import React, { useRef, useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonAlert
} from '@ionic/react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControl from './components/InputControl';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>(); // telling TS this state will eventually be number
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg'); // initially set to 'mkg'

  // setting up ref hook to capture input values
  const weightInput = useRef<HTMLIonInputElement>(null);   // <HTMLIonInputElement> and (null) is TS spec. it will hold core type element
  const heightInput = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    const enteredWeight = weightInput.current?.value; // ? is TS feature added and checking for null values
    const enteredHeight = heightInput.current!.value; // ! telling TS that this value will ALWAYS be set. it might be '' but not null

    if (!enteredHeight || !enteredWeight || +enteredWeight <= 0 || +enteredHeight <= 0) {
      setError('Please enter valid number (number has to be greater then 0).');
      return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;

    const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

    const height = +enteredHeight / heightConversionFactor;

    const weight = +enteredWeight / weightConversionFactor;

    const bmi = weight / (height * height);

    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInput.current!.value = '';
    heightInput.current!.value = '';
    setCalculatedBmi(NaN);
  };

  const clearError = () => {
    setError('');
  };

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    // setting aetCalcUnits to selected state
    setCalcUnits(selectedValue)
  };

  return (
    <React.Fragment>
      <IonAlert isOpen={!!error} message={error} buttons={[{ text: 'Okay', handler: clearError }]} />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Height  ({calcUnits === 'mkg' ? 'meters' : 'feet'})</IonLabel>
                  <IonInput type="number" ref={heightInput}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
  <IonLabel position="floating">Your Weight  ({calcUnits === 'mkg' ? 'kilograms' : 'pounds'})</IonLabel>
                  <IonInput type="number" ref={weightInput}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBmi} onReset={resetInputs} />
            {calculatedBmi && (
              <BmiResult onResult={calculatedBmi} />
            )}
          </IonGrid>
        </IonContent>

      </IonApp>
    </React.Fragment>
  );
};

export default App;
