import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm'

@Entity({name:"users"})
export class User{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column()
    createdAt:Date
}