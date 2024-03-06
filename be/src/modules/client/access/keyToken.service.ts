import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { KeyTokenModel } from "src/models/clientInfo/keyToken.model"

@Injectable()
export class KeyTokenService {

    constructor(@InjectModel(KeyTokenModel.name) private keyTokenModel:Model<KeyTokenModel>){}

    createKeyToken = async({userId, privateKey, publicKey, refreshToken}) => {
        try{
            const filter = {user: userId}
            const update = {publicKey, privateKey, refreshTokenUsed:[], refreshToken}
            const options = {upsert: true, new: true}

            const token = await this.keyTokenModel.findOneAndUpdate(filter, update, options)

            return token ? token.publicKey : null

        } catch(error) {
            return (error)
        }
    } 

    findByUserId = async (userId) => {
        return await this.keyTokenModel.findOne({user: userId})
    }

    removeKeyByUserId = async (userId) => {
        return await this.keyTokenModel.deleteOne({_id: userId})
    }

}
