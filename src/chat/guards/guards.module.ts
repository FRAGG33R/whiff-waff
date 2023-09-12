import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [GuardsService],
	exports: [GuardsService]
})
export class GuardsModule { }
