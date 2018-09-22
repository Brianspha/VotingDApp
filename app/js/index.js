import EmbarkJS from 'Embark/EmbarkJS';
import $ from 'jquery';
import VotingDApp from 'Embark/contracts/VotingDApp';
import JSAlert from "js-alert";
import notify from "bootstrap-notify";
// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';

EmbarkJS.onReady(() => {
    $(document).ready(() => {


        //@Dev tab styling functions start

        $('ul.tabs li').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');
            if (tab_id == "tab-5") {
                PrintBlockchainHistory();
            }
            $(this).addClass('current');
            $("#" + tab_id).addClass('current');

        })


        //@Dev tab styling functions end

        //@Dev smart contract calls start
        $("#Register").click((e) => { //@Dev when the user clicks on the register button
            web3.eth.getAccounts().then((e) => { //@Dev this basically getting the public accounts (test)
                var acc = e[0]; //@Dev upto 10 if you dont specify how many should be generated when the blockchain is launced
                var name = document.getElementById('name').value;
                var IDNo = document.getElementById('IDNO').value;
                //here
                //@Dev check if inputs are not null 

                VotingDApp.methods.Register(IDNo, name).send({
                    from: acc.toString(),
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert(`Something went wrong: ${err}`);
                    } else {
                        var output = outputTransactionRecipt(val, "GeneralLogger");
                        JSAlert.alert(`Success: ${output}`);
                    }

                });
            });

        });

        $("#RegisterP").click((e) => { //@Dev when the user clicks on the register button
            web3.eth.getAccounts().then((e) => { //@Dev this basically getting the public accounts (test)
                var acc = e[0]; //@Dev upto 10 if you dont specify how many should be generated when the blockchain is launced
                var name = document.getElementById('pname').value;
                VotingDApp.methods.RegisterCandidate(name).send({
                    from: acc.toString(),
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert(`Something went wrong: ${err}`);
                    } else {
                        var output = outputTransactionRecipt(val, "GeneralLogger");
                        JSAlert.alert(`Success: ${output}`);
                    }

                });
            });
        });

        $("#Vote").click((e) => { //@Dev when the user clicks on the register button
            web3.eth.getAccounts().then((e) => { //@Dev this basically getting the public accounts (test)
                var acc = e[0]; //@Dev upto 10 if you dont specify how many should be generated when the blockchain is launced
                var name = document.getElementById('Partyname').value;
                var ID = document.getElementById('IDVote').value;
                VotingDApp.methods.Vote(name, ID).send({
                    from: acc.toString(),
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert(`Something went wrong: ${err}`);
                    } else {
                        var output = outputTransactionRecipt(val, "VotedFor");
                        JSAlert.alert(`Success: ${output}`);
                    }

                });
            });



        });

        $("#Count").click((e) => { //@Dev when the user clicks on the register button
            web3.eth.getAccounts().then((e) => { //@Dev this basically getting the public accounts (test)
                var acc = e[0]; //@Dev upto 10 if you dont specify how many should be generated when the blockchain is launced
                var name = document.getElementById('VCount').value;
                VotingDApp.methods.Count(name).call({
                    from: acc.toString(),
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert(`Something went wrong: ${err}`);
                    } else {

                        JSAlert.alert(`Success: Party: ${name} has  ${val} votes  so far`);
                    }

                });
            });
        });


        //@Dev called when the user want to get info on a transaction recipt
        $("#GetInfo").click((e) => {

            outputInfo();
        })


        //@Dev smart contract calls end

        function outputInfo() {
            var hash = document.getElementById("TransactionHash").value;
            var para = document.getElementById("output");
            web3.eth.getTransactionReceipt(hash, function (val) {
                if (val == null) {
                    JSAlert.alert("Returned error: No transaction recipt found for given hash value");
                    return;
                }
                para.innerHTML += "Blockhash: " + val.blockHash.toString() + "<br>" + "BlockNumber: " + val.blockNumber.toString() + "<br>" + "cummalitiveGasUsed: " + val.cumulativeGasUsed.toString() + "<br>" + "logsBloom: " + val.logsBloom.toString() + "<br>" + "status: " + val.status.toString() + "<br>" + "to: " + val.to.toString() + "<br>" + "transactionIndex: " + val.transactionIndex.toString() + "<br>";
            })


        }

        function outputTransactionRecipt(value, loggerName) {
            var transactionEvents = value.events;
            var returnValues = "";
            if (transactionEvents == null) return;
            loggerName = (loggerName == "VotedFor" ? transactionEvents.VotedFor : transactionEvents.loggerName == "PartyVoteCount" ? transactionEvents.PartyVoteCount : transactionEvents.GeneralLogger);
            var string = "Address: " + loggerName.address + "\n blockHash: " + loggerName.blockHash + "\n BlockNumber: " + loggerName.blockNumber + "\n event: " + loggerName.event + "\n Id: " + loggerName.id + "\n Value returned: " + loggerName.returnValues[0];
            string += "\n Gasused: " + loggerName.cumulativeGasUsed + "\n TransactionHash : " + loggerName.transactionHash + "\n Transactionstatus: " + value.status;
            let transactionsList = JSON.parse(localStorage.getItem('TransactionsList'));
            returnValues = loggerName.returnValues;
            var toReturn = (returnValues.message != null) ? returnValues.message : returnValues.count; //@Dev if you were to create function within your smart contracts that return various data types you would have to add those variables 
            if (transactionsList == null) {
                transactionsList = [];
                transactionsList.push({
                    Signiture: loggerName.signature,
                    Address: loggerName.address,
                    BlockHash: loggerName.blockHash,
                    BlockNumber: loggerName.blockNumber,
                    GasUsed: value.cumulativeGasUsed,
                    TransactionHash: loggerName.transactionHash,
                    TransactionStatus: value.status,
                    ValueReturned: toReturn
                });
                localStorage.setItem('TransactionsList', JSON.stringify(transactionsList));
                //names in the above conditional statement likes so  (returnValues.message!=null)? returnValues.message:returnValues.count!=null?:returnValues.count: then check for the next thing your looking for etc
            }
            transactionsList.push({
                Signiture: loggerName.signature,
                Address: loggerName.address,
                BlockHash: loggerName.blockHash,
                BlockNumber: value.blockNumber,
                GasUsed: value.cumulativeGasUsed,
                TransactionHash: loggerName.transactionHash,
                TransactionStatus: value.status,
                ValueReturned: toReturn
            });
            localStorage.setItem('TransactionsList', JSON.stringify(transactionsList));
            $.notify(string, {
                allow_dismiss: false,
                placement: {
                    from: 'bottom',
                    align: 'center',
                    delay: 10000,
                    mouse_over: "pause"
                },
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
            return toReturn;
        }


        //@Dev Populates the Blockchain table with transaction history
        function PrintBlockchainHistory() {
            var table = document.getElementById("BlockchainSummary");
            var transactionsList = JSON.parse(localStorage.getItem("TransactionsList"));
            if (transactionsList != null) {
                var count = transactionsList.length - 1;
                while (count >= 0) //place the last 10 transactions
                {

                    var row = table.insertRow(table.length);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var currentTransaction = transactionsList[count];
                    cell1.innerHTML = currentTransaction.TransactionHash.toString();
                    cell2.innerHTML = currentTransaction.BlockNumber.toString();
                    cell3.innerHTML = currentTransaction.GasUsed != null ? currentTransaction.GasUsed.toString() : "NaN";
                    cell4.innerHTML = currentTransaction.ValueReturned.toString();
                    count--;
                }



            }
        }

    });
});
