import React from 'react';
import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

// TS in <> defining what type of props data will receive
// {onCalculate: () => void} telling TS that onCalculate is function that receives no argument and does not return anything

const BmiControls: React.FC<{ onCalculate: () => void; onReset: () => void }> = props => {
    return (
        <IonRow>
            <IonCol className="ion-text-left">
                <IonButton onClick={props.onCalculate}>
                    <IonIcon slot="start" icon={calculatorOutline} />
              Calculate
            </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
                <IonButton onClick={props.onReset}>
                    <IonIcon slot="start" icon={refreshOutline} />
              Reset
            </IonButton>
            </IonCol>
        </IonRow>
    );
};

export default BmiControls;