import React from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

// letting TS know that onResult will return number or string
const BmiResult: React.FC<{onResult: number | string}> = props => {
    return (
        <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent>
                    <h2>{props.onResult}</h2>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
    );
};

export default BmiResult