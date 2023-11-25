import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminCreateCategoryComponent } from './modal-admin-create-category.component';

describe('ModalAdminCreateCategoryComponent', () => {
  let component: ModalAdminCreateCategoryComponent;
  let fixture: ComponentFixture<ModalAdminCreateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminCreateCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminCreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
