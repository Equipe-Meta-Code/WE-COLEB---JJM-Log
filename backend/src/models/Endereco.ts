import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Cliente from "./Cliente";

@Entity('endereco')
class Endereco {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    cep: string;

    @Column({ type: 'varchar', nullable: true })
    rua: string;

    @Column({ type: 'varchar', nullable: true })
    bairro: string;

    @Column({ type: 'varchar', nullable: true })
    estado: string;

    @Column({ type: 'varchar', nullable: true })
    cidade: string;

    @Column({ type: 'varchar', nullable: true })
    numero: string;

    @Column({ type: 'varchar', nullable: true })
    complemento: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.enderecos, {
        onDelete: "CASCADE", // Exclui endereços ao excluir cliente, se necessário
        eager: true, // Defina como `true` se quiser carregar o cliente por padrão
    })
    @JoinColumn({ name: "cliente_id" }) // Nome da coluna no banco
    cliente: Cliente;
}

export default Endereco;
