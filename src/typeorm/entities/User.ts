import { Entity ,PrimaryGeneratedColumn,Column } from 'typeorm';
@Entity({name :'users'})

export class User{
@PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'Unknown'})
  name: string;

  @Column({default: 'Unknown'})
  email: string;

  @Column({default: 'Unknown'})
  password: string;
  @Column()
  createAt: Date;

  

}