using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class petidnull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "PetId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(Guid));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "PetId",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);
        }
    }
}
