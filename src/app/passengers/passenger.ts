export interface Passenger {
    _id: string,
    Name: string,
    Survived: number,
    Pclass: number,
    Sex: string,
    Age: number | string,
    SibSp: number,
    Parch: number,
    Ticket: number | string,
    Fare: number,
    Cabin: string,
    Embarked: string
}
