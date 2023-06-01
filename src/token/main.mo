import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
    Debug.print("Hello");
    var owner: Principal = Principal.fromText("orka3-65h47-yhxa5-cftwv-dkray-pyjs4-h7ibp-7bc2s-tzh7m-h7i5d-fae");
    var totalSupply: Nat = 1000000000;
    var symbol: Text = "BST";

    private stable var balanceEntries: [(Principal, Nat)] = [];

    private var balance = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if(balance.size() < 1){
        balance.put(owner, totalSupply);
    };


    public query func checkBalance(who: Principal): async Nat{
        let balanceResult: Nat = switch(balance.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balanceResult;
    };

    public query func checkSymbol(): async Text{
        return symbol;
    };

    public shared(id) func payOut(): async Text{
        if(balance.get(id.caller) == null){
            Debug.print(debug_show (id));
            let result = await transfer(id.caller, 10000);
            return result;

        } else {
            return "Already Claimed";
        }

    };

    public shared(id) func transfer(to: Principal, amount: Nat): async Text{
        let fromBalance = await checkBalance(id.caller);
        if(fromBalance > amount){
            let restValue: Nat = fromBalance - amount;
            balance.put(id.caller, restValue);
            
            let toBalance = await checkBalance(to);
            let newValueToBalance = toBalance + amount;
            balance.put(to, newValueToBalance);

            return "Success";
        } else {
            return "Insufficient funds";
        }
    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balance.entries());
    };

    system func postupgrade(){
        balance := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if(balance.size() < 1){
            balance.put(owner, totalSupply);
        }
    };

}