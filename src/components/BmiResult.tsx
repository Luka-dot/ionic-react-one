import React from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

// {onResult: number | string} letting TS know that onResult will return number or string
// using only number in this case so we can call toFixed later in order to display 2 decimals

const BmiResult: React.FC<{onResult: number}> = props => {
    return (
        <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent className="ion-text-center">
                    <h2>Your Body-Mass-Index</h2>
                    <h3 >{props.onResult.toFixed(2)}</h3>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
    );
};

export default BmiResult