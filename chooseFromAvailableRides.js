function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return (Math.round(diff));

}


function add_minutes(d1, miuntes) {

    var d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() + miuntes);
    return d2
}




class Rider {
    constructor(ID, Name, Location, DistanceToOrganization, Options, ArrivalTime, TimeToOrganizationMinutes, EarliestPickup) {
        this.ID = ID;
        this.Name = Name;
        this.Location = Location;
        this.isAssigned = false;
        this.DriverAssigned = -1;
        this.DistanceToOrganization = DistanceToOrganization;
        this.TimeToOrganizationMinutes = TimeToOrganizationMinutes;
        this.TrustedDrivers = []
        this.UnTrustedDrivers = []

        this.EarliestPickup = new Date(EarliestPickup[0], EarliestPickup[1], EarliestPickup[2], EarliestPickup[3], EarliestPickup[4], EarliestPickup[5]);

        //options ( GenderSmokingMusic)
        this.Options = Options;


        //Timing
        this.ArrivalTime = new Date(ArrivalTime[0], ArrivalTime[1], ArrivalTime[2], ArrivalTime[3], ArrivalTime[4], ArrivalTime[5]);
        this.PickupTime = this.ArrivalTime

    }
};
class Driver {
    constructor(ID, Name, Location, DistanceToOrganization, Options, ArrivalTime, TimeToOrganizationMinutes, capacity, EarliestStartTime) {
        this.ID = ID;
        this.Name = Name;
        this.Location = Location;
        this.EmptyPlaces = 4;
        this.AssignedRiders = [ID];
        this.TotalDistanceCoveredToDestination = 0;
        this.TotalDurationTaken = 0;
        this.DistanceToOrganization = DistanceToOrganization;
        this.TimeToOrganizationMinutes = TimeToOrganizationMinutes;
        this.EarliestStartTime = new Date(EarliestStartTime[0], EarliestStartTime[1], EarliestStartTime[2], EarliestStartTime[3], EarliestStartTime[4], EarliestStartTime[5]);
        this.capacity = capacity
        this.iteration = 0;
        this.MaxDistance = 1.5 * DistanceToOrganization //removeee
            //options ( GenderSmokingMusic)
        this.Options = Options;

        //Timing
        this.PoolStartTime = new Date();
        this.ArrivalTime = new Date(ArrivalTime[0], ArrivalTime[1], ArrivalTime[2], ArrivalTime[3], ArrivalTime[4], ArrivalTime[5]);

        this.MaxDuration = diff_minutes(this.ArrivalTime, this.EarliestStartTime)

    }
};


class distance {
    constructor(from, to, distance) {
        this.from = from;
        this.to = to;
        this.distance = distance;
        this.checked = 0;

    }

}
class duration {
    constructor(from, to, duration) {
        this.from = from;
        this.to = to;
        this.duration = duration;
        this.checked = 0;

    }

}
class userArray {
    constructor(ID) {
        this.length = 0;
        this.ID = ID;
        this.checked = 0;
        this.data = [];
    }
    getElementAtIndex(index) {
        return this.data[index];
    }
    push(element) {
        this.data[this.length] = element;
        this.length++;
        return this.length;
    }
    pop() {
        const item = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return this.data;
    }
    deleteAt(index) {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
        return this.data;
    }
    insertAt(item, index) {
        for (let i = this.length; i >= index; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[index] = item;
        this.length++;
        return this.data;
    }
}
class values {
    constructor(from, to, distance) {
        this.from = from;
        this.to = to;
        this.distance = distance;
    }
}

/////////////////////////////DataBase/////////////////////////////////////////


var driversID = [11]

var RidersID = [4, 6, 8, 9]


/////////////////////DURATION////




dvalues6 = new values(11, 4, 5);
dvalues7 = new values(11, 6, 4);
dvalues8 = new values(11, 8, 2);
dvalues9 = new values(11, 9, 10);






var dvalue = [dvalues6, dvalues7, dvalues8, dvalues9];

////////////////////////////////////////////////////RiderDatabase//////////// filter options and arrival time(-30,30) ,organization
dvalues1 = new values(4, 6, 8);
dvalues2 = new values(4, 8, 4); //rana
dvalues3 = new values(4, 9, 9);


dvalues4 = new values(6, 4, 10);
dvalues5 = new values(6, 8, 6);
dvalues6 = new values(6, 9, 12); // gezart 3arab


dvalues7 = new values(8, 4, 6); //10:20 M11
dvalues8 = new values(8, 6, 3);
dvalues9 = new values(8, 9, 7); //gam3at dewl



dvalues10 = new values(9, 4, 8);
dvalues11 = new values(9, 6, 12); //semsema
dvalues12 = new values(9, 8, 10);





var dvaluer = [dvalues1, dvalues2, dvalues3, dvalues4, dvalues5, dvalues6, dvalues7, dvalues8,
    dvalues9, dvalues10, dvalues11, dvalues12
]


//farah 8 6 4 9

var AvailableDriver = new Driver(11, "Farah", [29.97773, 31.31338], 4.6, 'F01', [2020, 3, 10, 4, 0, 0], 12, 5, [2020, 3, 10, 2, 30, 0]);



var NewRider = new Rider(4, "rana", [29.98409, 31.30631], 4.3, 'F01', [2020, 3, 10, 4, 0, 0], 9, [2020, 3, 10, 3, 15, 0]);
var Rider6 = new Rider(6, "gzrt3arb", [29.9769, 31.28636], 7, 'M11', [2020, 3, 10, 4, 0, 0], 16, [2020, 3, 10, 3, 15, 0]);
var Rider8 = new Rider(8, "gam3tdewl", [29.9762, 31.28636], 4.9, 'F01', [2020, 3, 10, 4, 0, 0], 12, [2020, 3, 10, 3, 15, 0]);
var Rider9 = new Rider(9, "semsema", [29.9769, 31.28636], 1.5, 'M11', [2020, 3, 10, 4, 30, 0], 5, [2020, 3, 10, 3, 50, 0]);

AvailableDriver.AssignedRiders.push(8)
AvailableDriver.AssignedRiders.push(6)
    //AvailableDriver.AssignedRiders.push(4)
AvailableDriver.AssignedRiders.push(9)




var Riders = new Array();
Riders.push(NewRider);
Riders.push(Rider6);
Riders.push(Rider8);
Riders.push(Rider9);


////////////////////////////////////////////////////////////






var DriversRidersDuration = new Array();

for (var i = 0; i < driversID.length; i++) { //get id's from offers
    var DriverRowDuration = new userArray(driversID[i]);

    for (var j = 0; j < dvalue.length; j++) {
        if (dvalue[j].from === driversID[i]) {
            var durationObj = new duration(dvalue[j].from, dvalue[j].to, dvalue[j].distance);

            DriverRowDuration.push(durationObj);
        }

    }
    DriversRidersDuration.push(DriverRowDuration);


}


var RiderRiderDuration = new Array();

for (var i = 0; i < RidersID.length; i++) {
    var RiderRowDuration = new userArray(RidersID[i]);

    for (var j = 0; j < dvaluer.length; j++) {
        if (dvaluer[j].from === RidersID[i]) {
            var durationObj = new duration(dvaluer[j].from, dvaluer[j].to, dvaluer[j].distance);

            RiderRowDuration.push(durationObj);
        }



    }
    RiderRiderDuration.push(RiderRowDuration);



}

//var TimeWithoutTakingRider = AvailableDriver.TotalDurationTaken;
var TimeWithoutTakingRider = 22;

let cloneDriver = Object.assign(Object.create(Object.getPrototypeOf(AvailableDriver)), AvailableDriver)

var NewAssignedArray = []
var AssignedDurationArray = []

for (var i = 1; i < cloneDriver.AssignedRiders.length + 1; i++) {
    var newAssigned = []
    var count = 0;
    newAssigned.push(cloneDriver.ID)
    for (var k = 1; k < cloneDriver.AssignedRiders.length + 1; k++) {
        if (k < i) {
            newAssigned.push(cloneDriver.AssignedRiders[k])
        } else if (k > i) {
            newAssigned.push(cloneDriver.AssignedRiders[k - 1])
        } else {
            newAssigned.push(NewRider.ID)
        }

    }

    var fromIndex;
    var toIndex;

    for (var j = newAssigned.length - 1; j >= 0; j--) {
        if (j == 0)

        { // Last iteration ( First Rider )


            toIndex = Riders.indexOf(Riders.find(n => n.ID === newAssigned[1]))
            DriverIndexinDriverRidersDuration = DriversRidersDuration.indexOf(DriversRidersDuration.find(n => n.ID === cloneDriver.ID))
            toRiderID = newAssigned[1];
            var datee = new Date(Riders[toIndex].PickupTime);
            cloneDriver.PoolStartTime = datee
            cloneDriver.PoolStartTime.setMinutes(Riders[toIndex].PickupTime.getMinutes() - DriversRidersDuration[DriverIndexinDriverRidersDuration].data.find(n => n.to === toRiderID).duration)

            //RiderRiderDuration[FromIndexinRiderRiderDuration].data.find(n => n.to === toID).duration

        } else if (j == newAssigned.length - 1) { // First iteration ( Last Rider )

            fromIndex = Riders.indexOf(Riders.find(n => n.ID === newAssigned[j]))
            cloneDriver.TotalDistanceCoveredToDestination += Riders[fromIndex].DistanceToOrganization;
            cloneDriver.TotalDurationTaken += Riders[fromIndex].TimeToOrganizationMinutes;
            var datee = new Date(cloneDriver.ArrivalTime);
            Riders[fromIndex].PickupTime = datee

            Riders[fromIndex].PickupTime.setMinutes(cloneDriver.ArrivalTime.getMinutes() - Riders[fromIndex].TimeToOrganizationMinutes)

        } else {
            fromIndex = Riders.indexOf(Riders.find(n => n.ID === newAssigned[j]));
            toIndex = Riders.indexOf(Riders.find(n => n.ID === newAssigned[j + 1]));
            toID = newAssigned[j + 1];
            fromID = newAssigned[j]
            FromIndexinRiderRiderDuration = RiderRiderDuration.indexOf(RiderRiderDuration.find(n => n.ID === fromID));

            var datee = new Date(Riders[toIndex].PickupTime);

            Riders[fromIndex].PickupTime = datee

            Riders[fromIndex].PickupTime.setMinutes(Riders[toIndex].PickupTime.getMinutes() - RiderRiderDuration[FromIndexinRiderRiderDuration].data.find(n => n.to === toID).duration)


        }

    }
    var flag = 0;
    for (var k = 1; k < newAssigned.length; k++) {
        var EarliestPick = Riders.find(n => n.ID === newAssigned[k]).EarliestPickup
        var ActualPick = Riders.find(n => n.ID === newAssigned[k]).PickupTime
        if (ActualPick < EarliestPick) {
            flag = 1;
            break;
        }

    }

    var TimeWithTakingRider = diff_minutes(cloneDriver.ArrivalTime, cloneDriver.PoolStartTime);
    var delta = TimeWithTakingRider - TimeWithoutTakingRider;

    if (diff_minutes(cloneDriver.ArrivalTime, cloneDriver.PoolStartTime) > cloneDriver.MaxDuration || delta > 30 || flag === 1) {
        continue;
    }

    NewAssignedArray.push(newAssigned)
    AssignedDurationArray.push(TimeWithTakingRider)
}
if (NewAssignedArray.length > 0) {

    AvailableDriver.AssignedRiders = NewAssignedArray[AssignedDurationArray.indexOf(Math.min.apply(null, AssignedDurationArray))]

    var fromIndex;
    var toIndex;
    AvailableDriver.TotalDurationTaken = 0;
    AvailableDriver.TotalDistanceCoveredToDestination = 0;

    for (var j = AvailableDriver.AssignedRiders.length - 1; j >= 0; j--) {
        if (j == 0)

        { // Last iteration ( First Rider )


            toIndex = Riders.indexOf(Riders.find(n => n.ID === AvailableDriver.AssignedRiders[1]))
            DriverIndexinDriverRidersDuration = DriversRidersDuration.indexOf(DriversRidersDuration.find(n => n.ID === AvailableDriver.ID))
            toRiderID = AvailableDriver.AssignedRiders[1];
            var datee = new Date(Riders[toIndex].PickupTime);

            AvailableDriver.TotalDurationTaken += DriversRidersDuration[DriverIndexinDriverRidersDuration].data.find(n => n.to === toRiderID).duration
                //  AvailableDriver.TotalDistanceCoveredToDestination += DriversRider[FromIndexinRiderRiderDuration].data.find(n => n.to === toRiderID).distance

            AvailableDriver.PoolStartTime = datee
            AvailableDriver.PoolStartTime.setMinutes(Riders[toIndex].PickupTime.getMinutes() - DriversRidersDuration[DriverIndexinDriverRidersDuration].data.find(n => n.to === toRiderID).duration)

            //RiderRiderDuration[FromIndexinRiderRiderDuration].data.find(n => n.to === toID).duration

        } else if (j == AvailableDriver.AssignedRiders.length - 1) { // First iteration ( Last Rider )

            fromIndex = Riders.indexOf(Riders.find(n => n.ID === AvailableDriver.AssignedRiders[j]))
            AvailableDriver.TotalDistanceCoveredToDestination += Riders[fromIndex].DistanceToOrganization;
            AvailableDriver.TotalDurationTaken += Riders[fromIndex].TimeToOrganizationMinutes;
            var datee = new Date(AvailableDriver.ArrivalTime);
            Riders[fromIndex].PickupTime = datee

            Riders[fromIndex].PickupTime.setMinutes(AvailableDriver.ArrivalTime.getMinutes() - Riders[fromIndex].TimeToOrganizationMinutes)

        } else {
            fromIndex = Riders.indexOf(Riders.find(n => n.ID === AvailableDriver.AssignedRiders[j]));
            toIndex = Riders.indexOf(Riders.find(n => n.ID === AvailableDriver.AssignedRiders[j + 1]));
            toID = AvailableDriver.AssignedRiders[j + 1];
            fromID = AvailableDriver.AssignedRiders[j]
            FromIndexinRiderRiderDuration = RiderRiderDuration.indexOf(RiderRiderDuration.find(n => n.ID === fromID));
            AvailableDriver.TotalDurationTaken += RiderRiderDuration[FromIndexinRiderRiderDuration].data.find(n => n.to === toID).duration
                //  AvailableDriver.TotalDistanceCoveredToDestination += RiderRider[FromIndexinRiderRiderDuration].data.find(n => n.to === toID).distance

            var datee = new Date(Riders[toIndex].PickupTime);

            Riders[fromIndex].PickupTime = datee

            Riders[fromIndex].PickupTime.setMinutes(Riders[toIndex].PickupTime.getMinutes() - RiderRiderDuration[FromIndexinRiderRiderDuration].data.find(n => n.to === toID).duration)


        }

    }


}