const logger = require('../utils/other/logger')
const dbUtil = require('../utils/db_related/dbUtil')
const {
   insertIntoTable,
   selectFromTable,
   updateTable
} = require('../utils/db_related/queryUtil');
const fileName = 'userModels';

module.exports.checkUserExistence = async (email)=>
{
    logger.info(`${fileName} checkUserExistence() called`)
    let sqlQuery = `select * from "Users" where email = $1`;
    let data = [email];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} checkUserExistence() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.signUp = async (columns,values)=>
{
    logger.info(`${fileName} signUp() called`);
    let sqlQuery = insertIntoTable("Users",columns);
    sqlQuery += " returning *"
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,values);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} signUp() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.updateUserDetails = async (columns,values)=>
{
    logger.info(`${fileName} updateUserDetails() called`)
    let sqlQuery = updateTable("Users",columns,"id");
    sqlQuery += " returning *"
    // let data = [];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,values);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} updateUserDetails() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.getUserDetailsByToken = async (token)=>
{
    logger.info(`${fileName} getUserDetailsByToken() called`)
    let sqlQuery = `select * from "Users" where access_token = $1`;
    let data = [token];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} getUserDetailsByToken() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.getUserDetailsById = async (token)=>
{
    logger.info(`${fileName} getUserDetailsById() called`)
    let sqlQuery = `select * from "Users" where access_token = $1`;
    let data = [token];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} getUserDetailsById() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.addChefDishes = async (columns,values)=>
{
    logger.info(`${fileName} addChefDishes() called`)
    let sqlQuery = insertIntoTable("Chef_Dishes",columns);
    // let data = [];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecMultipleRows(client,sqlQuery,values);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        logger.error(`${fileName} addChefDishes() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}