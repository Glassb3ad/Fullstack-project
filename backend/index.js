const http = require('http')
const express = require ('express')
const axios = require('axios')
const mongoose = require('mongoose')

const Symbol = require('./Symbols.js')
const Stocks = require('./Stocks.js')

const app = express()

/*axios.get(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=c3c50021c87bd311865047fd306d3f07`)
      .then(response => {
             //console.log(response.data)
             Symbol.insertMany(response.data)
             .then(() => {console.log('Data added')})
             .catch(error => {console.log(error)})
          })*/
Symbol.find({})
  .then( async (result) => {
        //console.log(result)
        await mongoose.connection.close() 
        let set = 0
        mongoose.connect(`mongodb+srv://jhalah:Muuli33@cluster0.ka30p.mongodb.net/Stocks?retryWrites=true&w=majority`)
        .then(result => {
            console.log('connected to MongoDB')
        })
        .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
        })
        setInterval( async () => {
                  await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${result[set].symbol}&apikey=4DJ9VUC5XUKKZ9MW`)
                   .then(async (res) => {
                         console.log(res.data)
                         const newStock = Stocks({
                              Symbol: res.data.Symbol,
                              AssetType: res.data.AssetType,
                              Name: res.data.Name,
                              Description: res.data.Description,
                              CIK: res.data.CIK,
                              Exchange: res.data.Exchange,
                              Currency: res.data.Currency,
                              Country: res.data.Country,
                              Sector: res.data.Sector,
                              Industry: res.data.Industry,
                              Address: res.data.Address,
                              FiscalYearEnd: res.data.FiscalYearEnd,
                              LatestQuarter: res.data.LatestQuarter,
                              MarketCapitalization: res.data.MarketCapitalization,
                              EBITDA: res.data.EBITDA,
                              PERatio: res.data.PERatio,
                              PEGRatio: res.data.PEGRatio,
                              BookValue: res.data.BookValue,
                              DividendPerShare: res.data.DividendPerShare,
                              DividendYield: res.data.DividendYield,
                              EPS: res.data.EPS,
                              RevenuePerShareTTM: res.data.RevenuePerShareTTM,
                              ProfitMargin: res.data.ProfitMargin,
                              OperatingMarginTTM: res.data.OperatingMarginTTM,
                              ReturnOnAssetsTTM: res.data.ReturnOnAssetsTTM,
                              ReturnOnEquityTTM: res.data.ReturnOnEquityTTM,
                              RevenueTTM: res.data.RevenueTTM,
                              GrossProfitTTM: res.data.GrossProfitTTM,
                              DilutedEPSTTM: res.data.DilutedEPSTTM,
                              QuarterlyEarningsGrowthYOY: res.data.QuarterlyEarningsGrowthYOY,
                              QuarterlyRevenueGrowthYOY: res.data.QuarterlyRevenueGrowthYOY,
                              AnalystTargetPrice: res.data.AnalystTargetPrice,
                              TrailingPE: res.data.TrailingPE,
                              ForwardPE: res.data.ForwardPE,
                              PriceToSalesRatioTTM: res.data.PriceToSalesRatioTTM,
                              PriceToBookRatio: res.data.PriceToBookRatio,
                              EVToRevenue: res.data.EVToRevenue,
                              EVToEBITDA: res.data.EVToEBITDA,
                              Beta: res.data.Beta,
                              '52WeekHigh': res.data['52WeekHigh'],
                              '52WeekLow': res.data['52WeekLow'],
                              '50DayMovingAverage': res.data['50DayMovingAverage'],
                              '200DayMovingAverage': res.data['200DayMovingAverage'],
                              SharesOutstanding: res.data.SharesOutstanding,
                              DividendDate: res.data.DividendDate,
                         }) 
                         await newStock.save()
                   })
                   set++
                   //mongoose.connection.close()
        }, 15000)
        })
  .catch( error => {console.log(error)})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)