import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
} 