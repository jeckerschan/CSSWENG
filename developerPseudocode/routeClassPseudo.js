class Route{
    constructor(Plant, SysRoute, FnRoute, SalesOrder, OutDeliver, StoreCode, SEQno, CustomerName, Vol, Weight, Ton, LoadDate, Mix, Window, Drops,  WeightUtil){

    this.Plant = Plant;
    this.SysRoute = SysRoute;
    this.FnRoute = FnRoute;
    this.SalesOrder = SalesOrder;
    this.OutDeliver = OutDeliver;
    this.StoreCode = StoreCode;
    this.SEQno =  SEQno;
    this.CustomerName = CustomerName;
    this.Vol = Vol;
    this.Weight = Weight;
    this.Ton = Ton;
    this.LoadDate = LoadDate;
    this.Mix = Mix;
    this.Window = Window;
    this.Drops = Drops;
    this.WeightUtil = WeightUtil;  
    }

    //Getters for each
    get Plant(){
        return this.plant
    }
    get SysRoute(){
        return this.SysRoute
    }
    get FnRoute(){
        return this.FnRoute
    }
    get SalesOrder(){
        return this.SalesOrder
    }
    get OutDeliver(){
        return this.OutDeliver
    }
    get StoreCode(){
        return this.StoreCode
    }
    get CustomerName(){
        return this.CustomerName
    }
    get Vol(){
        return this.Vol
    }
    get Weight(){
        return this.Weight
    }
    get Ton(){
        return this.Ton
    }
    get LoadDate(){
        return this.LoadDate
    }
    get Mix(){
        return this.Mix
    }
    get Window(){
        return this.Window
    }
    get Drops(){
        return this.Drops
    }
    get WeightUtil(){
        return this.WeightUtil
    }

    //Getter as a whole
    get routeDetail() {
        return{
           Plant: this.Plant,
           SysRoute: this.SysRoute, 
           FnRoute: this.FnRoute, 
           SalesOrder: this.SalesOrder, 
           OutDeliver: this.OutDeliver, 
           StoreCode: this.StoreCode, 
           SEQno: this.SEQno, 
           CustomerName: this.CustomerName, 
           Vol: this.Vol, 
           Weight: this.Weight, 
           Ton: this.Ton, 
           LoadDate:  this.LoadDate, 
           Mix: this.Mix, 
           Window: this.Window, 
           Drops: this.Drops,
           WeightUtil: this.WeightUtil  
        }
    }
}